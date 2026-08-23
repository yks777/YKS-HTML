/* ============================================
   YKS HTML — Templates Module
   ============================================ */

const Templates = (() => {
  const templates = [
    {
      name: "HTML5 Básico",
      desc: "Estrutura completa HTML5",
      code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Página</title>
</head>
<body>
  <h1>Olá, Mundo!</h1>
  <p>Esta é uma página HTML5 básica.</p>
</body>
</html>`
    },
    {
      name: "Flexbox Demo",
      desc: "Layout com Flexbox",
      code: `<style>
  .container {
    display: flex;
    gap: 16px;
    padding: 20px;
    min-height: 300px;
  }
  .item {
    flex: 1;
    background: #1a0f2e;
    border: 1px solid #2a0d45;
    border-radius: 6px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a855f7;
    font-weight: 600;
  }
  .item:nth-child(2) {
    flex: 2;
  }
</style>

<div class="container">
  <div class="item">flex: 1</div>
  <div class="item">flex: 2</div>
  <div class="item">flex: 1</div>
</div>`
    },
    {
      name: "CSS Grid",
      desc: "Layout com CSS Grid",
      code: `<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto 1fr auto;
    gap: 12px;
    padding: 20px;
    min-height: 300px;
  }
  .header {
    grid-column: 1 / -1;
    background: #1a0f2e;
    border: 1px solid #2a0d45;
    border-radius: 6px;
    padding: 16px;
    color: #f3edff;
    text-align: center;
  }
  .sidebar {
    background: #1a0f2e;
    border: 1px solid #2a0d45;
    border-radius: 6px;
    padding: 16px;
    color: #a855f7;
  }
  .main {
    background: #1a0f2e;
    border: 1px solid #2a0d45;
    border-radius: 6px;
    padding: 16px;
    color: #a390b5;
  }
  .footer {
    grid-column: 1 / -1;
    background: #1a0f2e;
    border: 1px solid #2a0d45;
    border-radius: 6px;
    padding: 12px;
    color: #581c87;
    text-align: center;
    font-size: 12px;
  }
</style>

<div class="grid">
  <div class="header">[ HEADER ]</div>
  <div class="sidebar">[ SIDEBAR ]</div>
  <div class="main">[ MAIN CONTENT ]</div>
  <div class="footer">$ grid-layout v1.0</div>
</div>`
    },
    {
      name: "Formulário",
      desc: "Form com validação",
      code: `<style>
  form {
    max-width: 400px;
    padding: 24px;
    background: #0d0812;
    border: 1px solid #2a0d45;
    border-radius: 8px;
  }
  h2 {
    color: #f3edff;
    margin-bottom: 20px;
    font-size: 18px;
  }
  .field {
    margin-bottom: 16px;
  }
  label {
    display: block;
    color: #a855f7;
    margin-bottom: 6px;
    font-size: 12px;
  }
  input, textarea {
    width: 100%;
    padding: 10px;
    background: #1a0f2e;
    border: 1px solid #2a0d45;
    border-radius: 4px;
    color: #f3edff;
    font-family: inherit;
  }
  input:focus, textarea:focus {
    outline: none;
    border-color: #a855f7;
  }
  .hint {
    color: #581c87;
    font-size: 11px;
    margin-top: 4px;
  }
  button {
    width: 100%;
    padding: 12px;
    background: #a855f7;
    color: #000;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
  }
  button:hover {
    background: #c084fc;
  }
</style>

<form>
  <h2>$ contato</h2>
  <div class="field">
    <label>> nome:</label>
    <input type="text" placeholder="seu nome">
  </div>
  <div class="field">
    <label>> email:</label>
    <input type="email" placeholder="email@exemplo.com">
    <div class="hint">não será compartilhado</div>
  </div>
  <div class="field">
    <label>> mensagem:</label>
    <textarea rows="4" placeholder="sua mensagem..."></textarea>
  </div>
  <button type="submit">[ enviar ]</button>
</form>`
    },
    {
      name: "Animação CSS",
      desc: "Keyframes e transições",
      code: `<style>
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    gap: 40px;
  }
  
  .box {
    width: 80px;
    height: 80px;
    background: #a855f7;
    border-radius: 8px;
  }
  
  .pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  .rotate {
    animation: rotate 3s linear infinite;
  }
  
  .bounce {
    animation: bounce 1s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  .label {
    color: #581c87;
    font-size: 11px;
    margin-top: 8px;
    text-align: center;
  }
  
  .demo {
    display: flex;
    gap: 40px;
  }
  
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<div class="demo">
  <div class="item">
    <div class="box pulse"></div>
    <div class="label">pulse</div>
  </div>
  <div class="item">
    <div class="box rotate"></div>
    <div class="label">rotate</div>
  </div>
  <div class="item">
    <div class="box bounce"></div>
    <div class="label">bounce</div>
  </div>
</div>`
    },
    {
      name: "Canvas JS",
      desc: "Canvas com JavaScript",
      code: `<canvas id="canvas" width="400" height="300"></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.style.background = '#0d0812';
  canvas.style.borderRadius = '8px';
  canvas.style.border = '1px solid #2a0d45';
  
  let particles = [];
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 3 + 1;
      this.color = \`hsl(\${270 + Math.random() * 30}, 70%, 60%)\`;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
</script>`
    },
    {
      name: "Tabela",
      desc: "Tabela estilizada",
      code: `<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px;
  }
  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #2a0d45;
  }
  th {
    background: #1a0f2e;
    color: #a855f7;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
  }
  tr:hover {
    background: rgba(168,85,247,0.05);
  }
  td {
    color: #a390b5;
  }
  .status {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
  }
  .status.active {
    background: rgba(34,197,94,0.2);
    color: #22c55e;
  }
  .status.pending {
    background: rgba(234,179,8,0.2);
    color: #eab308;
  }
  .status.inactive {
    background: rgba(239,68,68,0.2);
    color: #ef4444;
  }
</style>

<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Cargo</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice Silva</td>
      <td>Desenvolvedora</td>
      <td><span class="status active">ativo</span></td>
    </tr>
    <tr>
      <td>Bob Santos</td>
      <td>Designer</td>
      <td><span class="status pending">pendente</span></td>
    </tr>
    <tr>
      <td>Charlie Lima</td>
      <td>PM</td>
      <td><span class="status inactive">inativo</span></td>
    </tr>
  </tbody>
</table>`
    },
    {
      name: "Cards",
      desc: "Grid de cards",
      code: `<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;
  }
  .card {
    background: #0d0812;
    border: 1px solid #2a0d45;
    border-radius: 8px;
    padding: 20px;
    transition: all 0.2s ease;
  }
  .card:hover {
    border-color: #a855f7;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(168,85,247,0.2);
  }
  .card-icon {
    font-size: 24px;
    margin-bottom: 12px;
  }
  .card-title {
    color: #f3edff;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .card-desc {
    color: #581c87;
    font-size: 13px;
    line-height: 1.5;
  }
  .card-link {
    display: inline-block;
    margin-top: 12px;
    color: #a855f7;
    font-size: 12px;
  }
</style>

<div class="cards">
  <div class="card">
    <div class="card-icon">⚡</div>
    <div class="card-title">Performance</div>
    <div class="card-desc">Otimizado para velocidade e eficiência.</div>
    <span class="card-link">[ saiba mais ]</span>
  </div>
  <div class="card">
    <div class="card-icon">🔒</div>
    <div class="card-title">Segurança</div>
    <div class="card-desc">Proteção avançada contra ameaças.</div>
    <span class="card-link">[ saiba mais ]</span>
  </div>
  <div class="card">
    <div class="card-icon">🎨</div>
    <div class="card-title">Design</div>
    <div class="card-desc">Interface moderna e intuitiva.</div>
    <span class="card-link">[ saiba mais ]</span>
  </div>
</div>`
    }
  ];

  function getAll() {
    return templates;
  }

  function get(index) {
    return templates[index] || null;
  }

  function getNames() {
    return templates.map((t, i) => `[${i + 1}] ${t.name}`);
  }

  function search(query) {
    const q = query.toLowerCase();
    return templates.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.desc.toLowerCase().includes(q)
    );
  }

  return {
    getAll,
    get,
    getNames,
    search
  };
})();