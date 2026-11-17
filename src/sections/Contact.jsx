import { useEffect, useRef, useState } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import { brand, contact, projectTypes, budgetRanges } from '../config/site';
import { SplitChars } from '../components/SplitWords';
import ChromeButton from '../components/ChromeButton';
import Icon from '../components/Icons';

const empty = { nome: '', contato: '', tipo: '', orcamento: '', descricao: '', 'bot-field': '' };

function validate(v) {
  const e = {};
  if (v.nome.trim().length < 2) e.nome = 'Informe seu nome.';
  const c = v.contato.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
  const isPhone = c.replace(/\D/g, '').length >= 10;
  if (!isEmail && !isPhone) e.contato = 'Informe um e-mail válido ou WhatsApp com DDD.';
  if (!v.tipo) e.tipo = 'Selecione o tipo de projeto.';
  if (!v.orcamento) e.orcamento = 'Selecione uma faixa de orçamento.';
  if (v.descricao.trim().length < 20) e.descricao = 'Conte um pouco mais sobre a ideia (mín. 20 caracteres).';
  return e;
}

async function sendForm(values) {
  const payload = { ...values };
  delete payload['bot-field'];
  payload.tipo = projectTypes.find((t) => t.value === values.tipo)?.label || values.tipo;

  if (contact.formEndpoint) {
    const res = await fetch(contact.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Falha no envio');
    return;
  }
  // Netlify Forms (funciona automaticamente após o deploy no Netlify)
  const body = new URLSearchParams({ 'form-name': contact.netlifyFormName, ...values, tipo: payload.tipo });
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) throw new Error('Falha no envio');
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      <span className="field-line" aria-hidden="true" />
      <p className="field-error" id={`${id}-err`} role={error ? 'alert' : undefined}>{error || ''}</p>
    </div>
  );
}

export default function Contact({ ready }) {
  const root = useRef(null);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // "Solicitar orçamento" nos cards de serviço pré-seleciona o tipo
  useEffect(() => {
    const onSelect = (e) => setValues((v) => ({ ...v, tipo: e.detail }));
    window.addEventListener('stzz:select-service', onSelect);
    return () => window.removeEventListener('stzz:select-service', onSelect);
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: '.ct-title', start: 'top 92%', end: 'top 35%', scrub: 1 } })
        .fromTo('.ct-title .sc-i', { yPercent: 120, rotateX: -90, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, stagger: 0.025, ease: 'power3.out' }, 0)
        .fromTo('.ct-halo', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0);
      gsap.fromTo('.ct-sub, .ct-ctas > *', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-sub', start: 'top 92%', end: 'top 65%', scrub: 0.8 },
      });
      gsap.fromTo('.ct-form', { opacity: 0, y: 80, rotateX: 12, transformPerspective: 1200 }, {
        opacity: 1, y: 0, rotateX: 0, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-form', start: 'top 98%', end: 'top 60%', scrub: 0.8 },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  const update = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (values['bot-field']) return; // honeypot anti-spam
    const errs = validate(values);
    setErrors(errs);
    setTouched({ nome: true, contato: true, tipo: true, orcamento: true, descricao: true });
    if (Object.keys(errs).length) {
      root.current.querySelector(`#f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await sendForm(values);
      setStatus('success');
      setValues(empty);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const err = (k) => (touched[k] ? errors[k] : undefined);
  const aria = (k) => ({ 'aria-invalid': !!err(k), 'aria-describedby': `f-${k}-err` });

  return (
    <section id="contato" ref={root} className="section contact" aria-labelledby="ct-h">
      <div className="ct-halo" aria-hidden="true" />
      <div className="container">
        <div className="ct-head">
          <p className="eyebrow">Contato</p>
          <h2 id="ct-h" className="ct-title">
            <SplitChars text="SUA PRÓXIMA" className="ct-l" />
            <SplitChars text="GRANDE IDEIA" className="ct-l chrome-text" />
            <SplitChars text="COMEÇA AQUI." className="ct-l" />
          </h2>
          <p className="ct-sub">
            Pronto para transformar sua ideia em um site profissional? Entre em contato e vamos criar algo fora da curva.
          </p>
          <div className="ct-ctas">
            <ChromeButton href="#orcamento" icon={<Icon name="arrow" />}>SOLICITAR ORÇAMENTO</ChromeButton>
            <ChromeButton href={brand.instagramUrl} external variant="ghost" icon={<Icon name="instagram" />}>
              FALAR PELO INSTAGRAM
            </ChromeButton>
            {contact.whatsappUrl ? (
              <ChromeButton href={contact.whatsappUrl} external variant="ghost" icon={<Icon name="whatsapp" />}>WHATSAPP</ChromeButton>
            ) : (
              <ChromeButton variant="ghost" disabled icon={<Icon name="whatsapp" />} title="WhatsApp em breve">
                WHATSAPP <small>em breve</small>
              </ChromeButton>
            )}
          </div>
        </div>

        <form id="orcamento" className="ct-form" onSubmit={submit} noValidate name={contact.netlifyFormName} aria-labelledby="form-title">
          <div className="ct-form-glow" aria-hidden="true" />
          <h3 id="form-title" className="ct-form-title">Conte sua ideia</h3>
          <p className="hp" aria-hidden="true">
            <label>Não preencha: <input name="bot-field" tabIndex={-1} autoComplete="off" value={values['bot-field']} onChange={update('bot-field')} /></label>
          </p>
          <div className="ct-grid">
            <Field id="f-nome" label="Seu nome" error={err('nome')}>
              <input id="f-nome" name="nome" autoComplete="name" value={values.nome} onChange={update('nome')} onBlur={blur('nome')} {...aria('nome')} />
            </Field>
            <Field id="f-contato" label="E-mail ou WhatsApp" error={err('contato')}>
              <input id="f-contato" name="contato" autoComplete="email" value={values.contato} onChange={update('contato')} onBlur={blur('contato')} {...aria('contato')} />
            </Field>
            <Field id="f-tipo" label="Tipo de projeto" error={err('tipo')}>
              <select id="f-tipo" name="tipo" value={values.tipo} onChange={update('tipo')} onBlur={blur('tipo')} {...aria('tipo')}>
                <option value="" disabled>Selecione</option>
                {projectTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field id="f-orcamento" label="Orçamento estimado" error={err('orcamento')}>
              <select id="f-orcamento" name="orcamento" value={values.orcamento} onChange={update('orcamento')} onBlur={blur('orcamento')} {...aria('orcamento')}>
                <option value="" disabled>Selecione</option>
                {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field id="f-descricao" label="Descreva sua ideia" error={err('descricao')}>
              <textarea id="f-descricao" name="descricao" rows={5} value={values.descricao} onChange={update('descricao')} onBlur={blur('descricao')} {...aria('descricao')}
                placeholder="Objetivo do site, referências, prazos, o que for importante…" />
            </Field>
          </div>
          <div className="ct-submit">
            <ChromeButton type="submit" disabled={status === 'sending'} icon={<Icon name="send" />}>
              {status === 'sending' ? 'ENVIANDO…' : 'ENVIAR PEDIDO'}
            </ChromeButton>
            <p className={`ct-status is-${status}`} role="status" aria-live="polite">
              {status === 'success' && 'Pedido enviado! Em breve entraremos em contato.'}
              {status === 'error' && (
                <>Não foi possível enviar agora. Tente novamente ou chame no <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>.</>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
