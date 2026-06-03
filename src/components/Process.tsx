import styles from './Process.module.css'

const steps = [
  { num: '01', title: 'Discover', desc: 'We learn about your property, your guests and your goals.' },
  { num: '02', title: 'Strategise', desc: 'We craft a tailored plan that aligns your brand with your business goals.' },
  { num: '03', title: 'Design', desc: "We design a custom website that's beautiful, intuitive and built to convert." },
  { num: '04', title: 'Build', desc: 'We develop a fast, secure and SEO-friendly website that works flawlessly.' },
  { num: '05', title: 'Launch', desc: 'We test, refine and launch—then support you to grow your direct bookings.' },
]

export default function Process() {
  return (
    <section className={styles.process} id="process">
      <div className="wrap">
        <div className={styles.secLabel} data-reveal><span className="cap">Our process</span></div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={styles.step}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.ix}>{s.num}</div>
              <h4 className={styles.stepTitle}>{s.title}</h4>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
