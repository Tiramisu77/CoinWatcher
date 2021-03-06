import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { loadHistoricalPrices } from "@app/network"
import { increment, decrement } from "@app/redux/actions/activeRequests"
const Chart = require("chart.js")

function beforePrintHandler() {
    for (let id in Chart.instances) {
        Chart.instances[id].resize()
    }
}

function ChartView({ data, unit, label }) {
    const canvas = useRef(null)
    const [chart, setChart] = useState(null)
    useEffect(
        () => {
            window.addEventListener("beforeprint", beforePrintHandler)
            if (chart) {
                chart.destroy()
            }
            const newChart = new Chart(canvas.current, {
                type: "line",
                data: {
                    datasets: [
                        {
                            label: `price ${label}`,
                            data: data.prices,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255,99,132,1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                        {
                            label: `value ${label}`,
                            data: data.amounts,
                            backgroundColor: [
                                "rgba(72, 47, 156, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgba(72, 47, 156, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                            hidden: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                type: "time",
                                time: {
                                    unit: unit,
                                },
                                ticks: {
                                    suggestedMin: 0,
                                    maxTicksLimit: 8,
                                },
                            },
                        ],
                    },
                    elements: {
                        point: {
                            radius: 0,
                        },
                    },
                },
            })
            setChart(newChart)
            return () => window.removeEventListener("beforeprint", beforePrintHandler)
        },
        [data]
    )
    return (
        <div className="chart-container">
            <canvas style={{ width: 800, height: 300 }} ref={canvas} />
        </div>
    )
}

async function getChartData({ id, mainCurrency, period, signal, increment, decrement }) {
    period = /h/.test(period) ? 1 : parseInt(period)
    increment()
    let data = await loadHistoricalPrices(id, mainCurrency.toLowerCase(), period, signal)
    decrement()
    return data
}

function getUnit(periodStr) {
    if (periodStr === "1h") return "minute"
    if (/d/.test(periodStr)) return "day"
    if (/h/.test(periodStr)) return "hour"
}

function _CoinChart({ id, mainCurrency, period, amount, increment, decrement }) {
    const [data, setData] = useState(null)

    useEffect(
        () => {
            let controller = new AbortController()
            let signal = controller.signal

            getChartData({ id, mainCurrency, period, signal, increment, decrement })
                .then(({ prices }) => {
                    prices = prices.map(arr => {
                        let [x, y] = arr
                        return { x: new Date(x), y }
                    })
                    let amounts = prices.map(({ x, y }) => {
                        return { x, y: y * amount }
                    })
                    setData({ prices, amounts })
                })
                .catch(e => {
                    if (e.message === "The user aborted a request.") {
                        return
                    } else {
                        setData("error")
                    }
                })

            return function cleanup() {
                controller.abort()
            }
        },
        [period]
    )
    return (
        <>
            {data !== null && data !== "error" && <ChartView data={data} unit={getUnit(period)} label={mainCurrency} />}
            {data === "error" && <div>Unable to get chart for this coin</div>}
        </>
    )
}

export const CoinChart = connect(
    null,
    { increment, decrement }
)(_CoinChart)
