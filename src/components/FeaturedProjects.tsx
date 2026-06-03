import ArrowIcon from './ArrowIcon'
import styles from './FeaturedProjects.module.css'

const projects = [
  {
    href: '#',
    img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80&auto=format&fit=crop',
    alt: 'Boutique hotel pool',
    name: 'Casa Solana',
    meta: 'Boutique Hotel · Byron Bay',
    lifted: false,
  },
  {
    href: '#',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop',
    alt: 'Luxury villa stay',
    name: 'Villa Lumière',
    meta: 'Luxury Stay · Noosa Heads',
    lifted: true,
  },
  {
    href: '#',
    img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80&auto=format&fit=crop',
    alt: 'Beachfront bedroom',
    name: 'The Cove Stay',
    meta: 'Beachfront Stay · Palm Beach',
    lifted: false,
  },
]

export default function FeaturedProjects() {
  return (
    <section className={styles.sec} id="work">
      <div className={`wrap ${styles.wrapInner}`}>
        <div className={styles.secLabel} data-reveal><span className="cap">Featured projects</span></div>
        <div className={styles.workGrid}>
          {projects.map((p) => (
            <a
              key={p.name}
              className={`${styles.workCard} ${p.lifted ? styles.lifted : ''}`}
              href={p.href}
            >
              <div className={styles.photo}>
                <img src={p.img} alt={p.alt} loading="lazy" />
              </div>
              <h4 className={styles.name}>{p.name}</h4>
              <p className={styles.meta}>{p.meta}</p>
              <div className={styles.vp}>
                View project
                <span className={styles.icoArrow}><ArrowIcon /></span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <img
        className={styles.secPlant}
        src="/plant1.png"
        alt=""
        aria-hidden
        loading="lazy"
      />
    </section>
  )
}
