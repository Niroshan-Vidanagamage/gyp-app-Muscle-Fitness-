export default function Card({ title, subtitle, children }) {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}
      {subtitle && <p className="muted">{subtitle}</p>}
      <div>{children}</div>
    </div>
  )
}