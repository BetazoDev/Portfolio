/* eslint-disable react-refresh/only-export-components */
import { SiteFooter, SiteHeader } from '../components/SiteHeader';
export const metadata = { title: 'Contact' };
export default function ContactPage() { return <><SiteHeader /><main className="page-shell contact-page"><span className="eyebrow">CONTACT</span><h1>Have a system<br />in mind?</h1><p className="contact-lede">Tell me what you’re trying to make clearer, faster or more scalable.</p><div className="contact-links"><a href="mailto:hello@halonso.digital">hello@halonso.digital ↗</a><a href="https://www.linkedin.com" target="_blank">LinkedIn ↗</a><a href="https://github.com/BetazoDev" target="_blank">GitHub ↗</a></div></main><SiteFooter /></>; }
