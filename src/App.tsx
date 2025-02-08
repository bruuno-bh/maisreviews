import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, BarChart3, MessageSquare, Settings, Users, ArrowRight, Play, Menu, X } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    googleGmn: "",
    desafio: "",
    motivo: ""
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://flow.bhbdigital.com.br/webhook/site_google_reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      alert("Obrigado! Entraremos em contato em breve.");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
    }
  };

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'produto', label: 'Produto' },
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'como-funciona', label: 'Como Funciona' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'form', label: 'Cadastro' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-green-600" />
              <span className="font-bold text-green-900">Mais Reviews</span>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-colors hover:text-green-600 ${
                    activeSection === item.id ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block px-4 py-2 text-sm font-medium ${
                  activeSection === item.id ? 'text-green-600 bg-green-50' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Content with padding for fixed header */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Aumente Suas Avaliações no Google e Destaque-se da Concorrência
                </h1>
                <p className="text-xl md:text-2xl text-green-100 mb-8">
                  Obtenha até 10 Avaliações Gratuitamente e Descubra Como Um Sistema Automatizado Pode Transformar a Reputação do Seu Negócio
                </p>
                <button
                  onClick={scrollToForm}
                  className="bg-white text-green-700 py-3 px-8 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
                >
                  Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=800&q=80"
                  alt="Business Success"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Média de satisfação dos clientes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Introduction */}
        <section id="produto" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-6">Apresentação do Produto</h2>
                <p className="text-gray-600 mb-6">
                  Nosso serviço é focado em gerar mais avaliações dos seus clientes, principalmente no Google Meu Negócio. A ideia é melhorar sua visibilidade online e colher feedbacks valiosos que impulsionem o crescimento da sua empresa.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Settings className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Automação Completa</h3>
                      <p className="text-gray-600">Cuidamos de todo o processo de envio de mensagens e follow-ups</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Personalização Exclusiva</h3>
                      <p className="text-gray-600">Incluímos uma foto personalizada do dono do negócio</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">10 Avaliações Gratuitas</h3>
                      <p className="text-gray-600">Comprove na prática o valor do nosso serviço</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={scrollToForm}
                  className="mt-8 bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  Solicitar Demonstração
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                  alt="Business Reviews"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="bg-green-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Veja Como Funciona</h2>
            <div className="relative max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-50 transition-colors">
                  <Play className="w-8 h-8 text-green-600 ml-1" />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="Video Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={scrollToForm}
              className="mt-12 bg-white text-green-900 py-3 px-8 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">Por que Você Precisa de Mais Avaliações?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Melhor Ranqueamento no Google</h3>
                <p className="text-gray-600">Ter avaliações positivas e frequentes no Google Meu Negócio faz com que seu estabelecimento seja recomendado com mais destaque nas pesquisas.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Autoridade e Confiança</h3>
                <p className="text-gray-600">Clientes confiam mais em empresas bem avaliadas e com feedback recente.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Feedback Construtivo</h3>
                <p className="text-gray-600">Críticas construtivas podem ajudar a ajustar processos internos e melhorar ainda mais a qualidade do seu serviço ou produto.</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <button
                onClick={scrollToForm}
                className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              >
                Quero Aumentar Minhas Avaliações
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="como-funciona" className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">Como Funciona</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="Process Workflow"
                className="rounded-lg shadow-xl"
              />
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Implantação Rápida</h3>
                    <p className="text-gray-600">Nossa equipe configura o sistema de mensagens personalizado com a identidade visual do seu negócio.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Envio de Convites</h3>
                    <p className="text-gray-600">Seus clientes receberão mensagens educadas e persuasivas, convidando-os a deixar uma avaliação.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Monitoramento Contínuo</h3>
                    <p className="text-gray-600">Acompanhe em tempo real as novas avaliações e o crescimento da sua reputação online.</p>
                  </div>
                </div>
                <button
                  onClick={scrollToForm}
                  className="mt-8 bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                >
                  Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="resultados" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">Como Garantimos Resultados?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-green-100">
                <h3 className="font-semibold text-green-900 mb-2">Experiência de Mercado</h3>
                <p className="text-gray-600">Nossa equipe possui anos de atuação em marketing digital e entendimento profundo das melhores práticas.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-green-100">
                <h3 className="font-semibold text-green-900 mb-2">Suporte Dedicado</h3>
                <p className="text-gray-600">Você terá um canal direto com nosso time, garantindo respostas rápidas.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-green-100">
                <h3 className="font-semibold text-green-900 mb-2">Tecnologia Testada</h3>
                <p className="text-gray-600">Utilizamos ferramentas confiáveis e testadas por diversos clientes.</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <button
                onClick={scrollToForm}
                className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              >
                Quero Garantir Meus Resultados
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Form Section */}
       <section id="form" className="py-20 bg-green-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Solicite Suas 10 Avaliações Gratuitas
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Seu melhor e-mail"
                required
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="(XX) XXXXX-XXXX"
                required
              />
            </div>
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nome da sua empresa"
                required
              />
            </div>
            <div>
              <label htmlFor="googleGmn" className="block text-sm font-medium text-gray-700 mb-1">Seu Google Meu Negócio</label>
              <input
                type="text"
                id="googleGmn"
                name="googleGmn"
                value={formData.googleGmn}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Seu perfil no google"
              />
            </div>
            <div>
              <label htmlFor="desafio" className="block text-sm font-medium text-gray-700 mb-1">Qual é o principal desafio do seu negócio hoje?</label>
              <textarea
                id="desafio"
                name="desafio"
                value={formData.desafio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Explique seu maior desafio"
              />
            </div>
            <div>
              <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 mb-1">Por que devemos aceitar sua empresa para as avaliações gratuitas? </label>
              <textarea
                id="motivo"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Conte-nos o motivo"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              Solicitar Avaliações Gratuitas
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
            </div>
          </div>
        </section>
      </main>

     
      {/* Footer */}
<footer className="bg-green-950 py-8">
  <div className="container mx-auto px-4 text-center text-green-100">
    <p>
      <a 
        href="https://www.google.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="underline hover:text-green-300 transition-colors"
      >
        Mais Reviews
      </a> 
      {" | © 2025 Todos os direitos reservados"}
    </p>
  </div>
</footer>
    </div>
  );
}

export default App;