"use client";

const etbFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(date) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

function ChartTable({ caption, data, valueHeading, formatValue }) {
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col" className="number-cell">{valueHeading}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((day) => (
          <tr key={day.date}>
            <th scope="row">{formatDate(day.date)}</th>
            <td className="number-cell">{formatValue(day)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function OrderCharts({ data }) {
  const hasRevenue = data.some((day) => Number.isFinite(day.revenue));
  const maxRevenue = Math.max(
    1,
    ...data.map((day) => (Number.isFinite(day.revenue) ? day.revenue : 0)),
  );
  const maxOrders = Math.max(1, ...data.map((day) => day.orders));
  const plot = { left: 64, top: 16, width: 500, height: 180 };
  const barWidth = plot.width / data.length / 2;
  const points = data.map((day, index) => ({
    x: plot.left + (index * plot.width) / Math.max(1, data.length - 1),
    y: plot.top + plot.height - (day.orders / maxOrders) * plot.height,
  }));

  return (
    <section aria-labelledby="analytics-heading">
      <h2 id="analytics-heading">Order analytics</h2>
      <section aria-labelledby="revenue-heading">
        <h3 id="revenue-heading">Revenue (ETB), last 7 days</h3>
        <div className="chart-container">
          {hasRevenue ? <svg
            className="chart-svg"
            viewBox="0 0 600 240"
            role="img"
            aria-label="Revenue in Ethiopian birr for each of the last seven days"
          >
            {[0, 0.5, 1].map((fraction) => {
              const y = plot.top + plot.height * (1 - fraction);
              return (
                <g key={fraction}>
                  <line x1={plot.left} x2={plot.left + plot.width} y1={y} y2={y} className="chart-grid" />
                  <text x={plot.left - 8} y={y + 4} textAnchor="end">
                    {etbFormatter.format(maxRevenue * fraction)}
                  </text>
                </g>
              );
            })}
            {data.map((day, index) => {
              const height = ((day.revenue ?? 0) / maxRevenue) * plot.height;
              const x = plot.left + (index * plot.width) / data.length + barWidth / 2;
              return (
                <g key={day.date}>
                  <rect
                    x={x}
                    y={plot.top + plot.height - height}
                    width={barWidth}
                    height={height}
                    rx="3"
                    className="chart-bar"
                  />
                  <text x={x + barWidth / 2} y={plot.top + plot.height + 20} textAnchor="middle">
                    {formatDate(day.date)}
                  </text>
                </g>
              );
            })}
          </svg> : <p className="chart-empty">Revenue totals have not been recorded.</p>}
        </div>
        <ChartTable
          caption="Daily revenue for the last 7 days"
          data={data}
          valueHeading="Revenue (ETB)"
          formatValue={(day) =>
            Number.isFinite(day.revenue)
              ? etbFormatter.format(day.revenue)
              : "Not recorded"
          }
        />
      </section>

      <section aria-labelledby="orders-per-day-heading">
        <h3 id="orders-per-day-heading">Orders per day (last 7 days; unit: orders)</h3>
        <div className="chart-container">
          <svg
            className="chart-svg"
            viewBox="0 0 600 240"
            role="img"
            aria-label="Number of orders placed on each of the last seven days"
          >
            {[0, 0.5, 1].map((fraction) => {
              const y = plot.top + plot.height * (1 - fraction);
              return (
                <g key={fraction}>
                  <line x1={plot.left} x2={plot.left + plot.width} y1={y} y2={y} className="chart-grid" />
                  <text x={plot.left - 8} y={y + 4} textAnchor="end">
                    {Math.round(maxOrders * fraction)}
                  </text>
                </g>
              );
            })}
            <polyline
              points={points.map(({ x, y }) => `${x},${y}`).join(" ")}
              className="chart-line"
            />
            {data.map((day, index) => (
              <g key={day.date}>
                <circle cx={points[index].x} cy={points[index].y} r="4" className="chart-point" />
                <text x={points[index].x} y={plot.top + plot.height + 20} textAnchor="middle">
                  {formatDate(day.date)}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <ChartTable
          caption="Orders per day for the last 7 days"
          data={data}
          valueHeading="Orders"
          formatValue={(day) => day.orders}
        />
      </section>
    </section>
  );
}
