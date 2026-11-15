import { ArrowUpRight, Camera } from 'lucide-react'

const currentYear = new Date().getFullYear()

export default function Footer({ content }) {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-intro">
          <a className="brand-lockup" href="#home"><span className="brand-mark">ਪ੍ਰੀ</span><span><strong>{content.branding.shortName}</strong><small>Entertainment</small></span></a>
          <p>{content.footer.description}</p>
          <a className="footer-instagram" href={content.socialMedia.instagram.url} target="_blank" rel="noreferrer noopener"><Camera size={18} /> {content.socialMedia.instagram.handle} <ArrowUpRight size={16} /></a>
        </div>
        {content.footer.columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((link) => (
              <a href={link.href} key={link.label} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}>{link.label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="page-shell footer-bottom"><span>© {currentYear} {content.footer.copyright}</span><span>{content.footer.credit}</span></div>
    </footer>
  )
}
