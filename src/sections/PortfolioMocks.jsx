/**
 * Telas de demonstração detalhadas exibidas dentro dos mockups de navegador.
 * São marcas fictícias. Quando um projeto real tiver `image`, a captura substitui a tela.
 * Tudo é medido em "em" e escala junto com o mockup (container query).
 */

function Barber() {
  const services = [
    ['Corte clássico', '45 min', 'R$ 45'],
    ['Barba completa', '30 min', 'R$ 35'],
    ['Corte + barba', '1h 10', 'R$ 70'],
    ['Pigmentação', '40 min', 'R$ 50'],
  ];
  return (
    <div className="ms ms--barber">
      <header className="ms-nav">
        <b className="ms-logo">NOIR<i>BARBER CLUB</i></b>
        <nav><span>Serviços</span><span>Planos</span><span>Equipe</span><span>Contato</span></nav>
        <span className="ms-btn sm">Agendar</span>
      </header>
      <section className="msb-hero">
        <div>
          <small className="ms-kicker">Barbearia premium</small>
          <h4>Corte de<br />respeito.</h4>
          <p>Corte, barba e cuidado em um ambiente exclusivo. Agende em segundos pelo WhatsApp.</p>
          <div className="ms-row">
            <span className="ms-btn">Agendar horário</span>
            <span className="ms-btn ghost">Ver serviços</span>
          </div>
          <div className="msb-info"><span><b>Seg–Sáb</b>9h às 20h</span><span><b>Online</b>agendamento</span><span><b>Wi‑Fi</b>e café</span></div>
        </div>
        <div className="msb-photo"><span className="msb-chair" /><span className="msb-light" /></div>
      </section>
      <section className="ms-sec">
        <div className="ms-sechead"><small className="ms-kicker">Serviços</small><h5>Escolha seu estilo</h5></div>
        <ul className="msb-list">
          {services.map(([n, t, p]) => (
            <li key={n}><span>{n}</span><em>{t}</em><i />{p}</li>
          ))}
        </ul>
      </section>
      <section className="ms-sec msb-plans">
        {[['Básico', 'R$ 89', '2 cortes / mês'], ['Club', 'R$ 149', 'Cortes ilimitados'], ['Black', 'R$ 199', 'Corte + barba ilimitados']].map(([n, p, d], i) => (
          <div key={n} className={i === 1 ? 'is-featured' : ''}><small>{n}</small><b>{p}</b><span>{d}</span><u>Assinar</u></div>
        ))}
      </section>
      <section className="ms-cta"><h5>Seu próximo corte começa aqui.</h5><span className="ms-btn">Chamar no WhatsApp</span></section>
      <span className="ms-wa" />
    </div>
  );
}

function Store() {
  const products = [
    ['Jaqueta Onyx', 'R$ 349,90', 'a'],
    ['Camiseta Chrome', 'R$ 129,90', 'b'],
    ['Calça Cargo Slate', 'R$ 259,90', 'c'],
    ['Moletom Silver', 'R$ 219,90', 'd'],
  ];
  return (
    <div className="ms ms--store">
      <div className="mss-top">Frete grátis acima de R$ 199 · 10% off no Pix</div>
      <header className="ms-nav">
        <b className="ms-logo serif">AURUM</b>
        <nav><span>Novidades</span><span>Masculino</span><span>Feminino</span><span>Acessórios</span></nav>
        <div className="mss-tools"><span className="mss-search">Buscar…</span><span className="mss-cart">2</span></div>
      </header>
      <section className="mss-banner">
        <div>
          <small className="ms-kicker">Coleção inverno</small>
          <h4>Silver<br />Season</h4>
          <p>Peças atemporais em tons de prata, grafite e preto.</p>
          <span className="ms-btn">Comprar agora</span>
        </div>
        <div className="mss-model"><span /><i /></div>
      </section>
      <div className="mss-cats">{['Jaquetas', 'Camisetas', 'Calças', 'Moletons', 'Acessórios'].map((c) => <span key={c}>{c}</span>)}</div>
      <section className="ms-sec">
        <div className="ms-sechead row"><h5>Mais vendidos</h5><small>Ver todos →</small></div>
        <div className="mss-grid">
          {products.map(([n, p, k]) => (
            <div className="mss-card" key={n}>
              <div className={`mss-img v-${k}`}><em>Novo</em></div>
              <span>{n}</span>
              <b>{p}</b>
              <small>ou 3x sem juros</small>
              <u>Adicionar ao carrinho</u>
            </div>
          ))}
        </div>
      </section>
      <section className="mss-perks">
        {[['Frete grátis', 'acima de R$ 199'], ['Troca fácil', 'em até 30 dias'], ['Pagamento seguro', 'Pix e cartão']].map(([t, d]) => (
          <div key={t}><i /><b>{t}</b><span>{d}</span></div>
        ))}
      </section>
    </div>
  );
}

function Lens() {
  return (
    <div className="ms ms--lens">
      <header className="ms-nav">
        <b className="ms-logo">LENS<i>STUDIO</i></b>
        <nav><span>Trabalhos</span><span>Sobre</span><span>Contato</span></nav>
        <span className="ms-btn ghost sm">Orçamento</span>
      </header>
      <section className="msl-hero">
        <small className="ms-kicker">Fotografia autoral</small>
        <h4>Imagens que<br />contam histórias.</h4>
        <div className="msl-filters"><span className="on">Todos</span><span>Ensaios</span><span>Eventos</span><span>Produtos</span><span>Arquitetura</span></div>
      </section>
      <section className="msl-grid">
        {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((k) => <div key={k} className={`msl-ph p-${k}`}><span>Ensaio {k.toUpperCase()}</span></div>)}
      </section>
      <section className="ms-sec msl-about">
        <div className="msl-portrait" />
        <div>
          <small className="ms-kicker">Sobre</small>
          <h5>Luz, enquadramento e intenção.</h5>
          <p>Ensaios personalizados, cobertura de eventos e fotos de produto com direção completa.</p>
          <div className="msl-stats"><span><b>+300</b>ensaios</span><span><b>8</b>anos</span><span><b>48h</b>prévia</span></div>
        </div>
      </section>
      <section className="ms-cta"><h5>Vamos criar algo juntos?</h5><span className="ms-btn">Solicitar orçamento</span></section>
    </div>
  );
}

function Company() {
  return (
    <div className="ms ms--company">
      <header className="ms-nav">
        <b className="ms-logo"><span className="msc-mark" />VÉRTICE</b>
        <nav><span>Empresa</span><span>Soluções</span><span>Obras</span><span>Contato</span></nav>
        <span className="ms-btn sm">Fale conosco</span>
      </header>
      <section className="msc-hero">
        <div>
          <small className="ms-kicker">Engenharia e construção</small>
          <h4>Engenharia que<br />constrói o futuro.</h4>
          <p>Projetos residenciais, comerciais e industriais com planejamento, segurança e prazo.</p>
          <div className="ms-row"><span className="ms-btn">Solicitar orçamento</span><span className="ms-btn ghost">Nossas obras</span></div>
        </div>
        <div className="msc-building"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      </section>
      <section className="msc-stats">
        {[['+120', 'obras entregues'], ['15', 'anos de mercado'], ['98%', 'no prazo'], ['24h', 'retorno']].map(([n, l]) => (
          <div key={l}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>
      <section className="ms-sec">
        <div className="ms-sechead"><small className="ms-kicker">Soluções</small><h5>Do projeto à entrega</h5></div>
        <div className="msc-cards">
          {[['Projetos', 'Arquitetônico, estrutural e elétrico.'], ['Execução', 'Gestão completa de obra.'], ['Reformas', 'Comerciais e residenciais.']].map(([t, d]) => (
            <div key={t}><i /><b>{t}</b><span>{d}</span></div>
          ))}
        </div>
      </section>
      <section className="msc-clients">{['ALFA', 'NORTE', 'PRISMA', 'ATLAS', 'ORBE'].map((c) => <span key={c}>{c}</span>)}</section>
    </div>
  );
}

const MOCKS = { barber: Barber, store: Store, portfolio: Lens, company: Company };

export default function PortfolioMock({ variant }) {
  const M = MOCKS[variant] || Barber;
  return <M />;
}
