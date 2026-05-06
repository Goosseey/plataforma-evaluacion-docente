import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  GraduationCap, 
  CheckSquare, 
  ThumbsUp, 
  ThumbsDown,
  AlertCircle,
  CalendarDays,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Search
} from 'lucide-react';

// --- COMPONENTES REUTILIZABLES ---

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-lg mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="font-semibold text-slate-800">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-700" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-slate-200 text-slate-600 leading-relaxed bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

const Card = ({ title, icon: Icon, children, borderColor = "border-blue-600" }) => (
  <div className={`bg-white rounded-xl shadow-sm border-t-4 ${borderColor} p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-center space-x-3 mb-4">
      <div className={`p-2 rounded-lg ${borderColor === 'border-red-600' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-700'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600">
      {children}
    </div>
  </div>
);

// --- VISTAS PRINCIPALES ---

const Dashboard = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Bienvenido al Sistema de Evaluación Docente</h1>
      <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
        Nuestra plataforma garantiza transparencia, rigor metodológico y objetividad en el proceso de observación en aula. 
        Aquí encontrará todos los criterios, herramientas y ejemplos para una evaluación justa y constructiva.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Transparencia" icon={Search} borderColor="border-blue-600">
        <p>Acceso anticipado a todos los criterios e indicadores que serán evaluados durante las sesiones.</p>
      </Card>
      <Card title="Rigor Académico" icon={BookOpen} borderColor="border-red-600">
        <p>Rúbricas basadas en evidencia observable y modelos pedagógicos de alto nivel institucional.</p>
      </Card>
      <Card title="Mejora Continua" icon={GraduationCap} borderColor="border-blue-600">
        <p>El objetivo principal es identificar áreas de oportunidad y fortalecer la práctica docente.</p>
      </Card>
    </div>
  </div>
);

const MarcoTeorico = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Marco Teórico y Sesgos</h2>
      <p className="text-slate-600">Fundamentos de nuestra evaluación y control de objetividad.</p>
    </div>

    <Accordion title="Principios de la Evaluación Objetiva">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Evidencia Observable:</strong> La evaluación se basa únicamente en comportamientos, materiales y dinámicas observables en el aula, no en suposiciones.</li>
        <li><strong>Enfoque Formativo:</strong> La observación busca el desarrollo profesional continuo del docente.</li>
        <li><strong>Contextualización:</strong> Se toma en cuenta el tamaño del grupo, la materia y los recursos disponibles.</li>
      </ul>
    </Accordion>

    <Accordion title="Control de Sesgos en la Evaluación">
      <p className="mb-4">Para garantizar la equidad, los evaluadores son capacitados para mitigar los siguientes sesgos cognitivos:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
          <h4 className="font-bold text-red-700 mb-1">Efecto Halo</h4>
          <p className="text-sm">Permitir que una característica positiva (ej. carisma) influya en la calificación de otras áreas técnicas.</p>
        </div>
        <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
          <h4 className="font-bold text-red-700 mb-1">Sesgo de Tendencia Central</h4>
          <p className="text-sm">Evaluar a la mayoría de los docentes en el "promedio" para evitar justificar calificaciones muy altas o bajas.</p>
        </div>
      </div>
    </Accordion>
  </div>
);

const ModelosPedagogicos = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Modelos Pedagógicos</h2>
      <p className="text-slate-600">Marcos conceptuales que guían nuestras rúbricas de evaluación.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card title="Alineamiento Constructivo (Biggs)" icon={LayoutDashboard} borderColor="border-blue-600">
        <p className="mb-4">Asegura que las actividades de enseñanza y evaluación estén directamente alineadas con los resultados de aprendizaje esperados.</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Resultados de aprendizaje claros.</li>
          <li>Actividades que promueven el aprendizaje activo.</li>
          <li>Evaluación coherente con los objetivos.</li>
        </ul>
      </Card>
      
      <Card title="Diseño Inverso (Wiggins & McTighe)" icon={FileText} borderColor="border-red-600">
        <p className="mb-4">Planificación que comienza con el fin en mente (resultados), determina la evidencia aceptable y luego planifica la instrucción.</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Identificar resultados deseados.</li>
          <li>Determinar evidencia de aprendizaje.</li>
          <li>Planificar experiencias de aprendizaje.</li>
        </ul>
      </Card>
    </div>
  </div>
);

const Rubrica = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="mb-8 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Rúbrica de Evaluación</h2>
        <p className="text-slate-600">Criterios de evidencia observable en aula.</p>
      </div>
      <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
        <FileText className="w-4 h-4 mr-2" />
        Descargar PDF
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <th className="p-4 font-semibold w-1/4">Dimensión</th>
              <th className="p-4 font-semibold w-1/4">Destacado (4)</th>
              <th className="p-4 font-semibold w-1/4">Suficiente (3)</th>
              <th className="p-4 font-semibold w-1/4">En Desarrollo (1-2)</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-600">
            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="p-4 font-medium text-slate-800">Estructura de la Clase</td>
              <td className="p-4">Presenta objetivos claros, conecta con saberes previos y realiza un cierre articulado.</td>
              <td className="p-4">Presenta objetivos, pero falta conexión clara con conocimientos previos o cierre débil.</td>
              <td className="p-4">Carece de estructura evidente, no presenta objetivos de sesión.</td>
            </tr>
            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="p-4 font-medium text-slate-800">Interacción y Participación</td>
              <td className="p-4">Fomenta diálogo continuo, hace preguntas retadoras y asegura participación equitativa.</td>
              <td className="p-4">Permite participación pero es mayormente direccional (Docente -{'>'} Alumno).</td>
              <td className="p-4">Monólogo del docente. No hay espacio para preguntas o retroalimentación.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-medium text-slate-800">Uso de Recursos</td>
              <td className="p-4">Integra tecnología/materiales de forma innovadora que enriquece el aprendizaje.</td>
              <td className="p-4">Usa presentaciones u otros materiales como simple apoyo visual.</td>
              <td className="p-4">No utiliza recursos de apoyo o estos son ilegibles/confusos.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Ejemplos = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Ejemplos y Contraejemplos</h2>
      <p className="text-slate-600">Prácticas observables que ilustran los criterios de la rúbrica.</p>
    </div>

    <div className="space-y-8">
      {/* Criterio 1 */}
      <div>
        <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">1. Retroalimentación Formativa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            <div className="flex items-center text-blue-800 font-bold mb-3">
              <ThumbsUp className="w-5 h-5 mr-2" /> Práctica Esperada
            </div>
            <p className="text-slate-700 italic">"María, tu análisis del caso es correcto porque identificaste las variables clave. Para mejorarlo, intenta vincularlo con la teoría vista en la semana 2."</p>
            <div className="mt-3 text-xs bg-white text-blue-800 px-3 py-1 rounded-full inline-block font-medium border border-blue-100">
              Específica, orientada a la mejora.
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
            <div className="flex items-center text-red-800 font-bold mb-3">
              <ThumbsDown className="w-5 h-5 mr-2" /> Práctica a Evitar
            </div>
            <p className="text-slate-700 italic">"Buen trabajo a todos los que entregaron la tarea. Los que salieron bajos, estudien más para el próximo examen."</p>
            <div className="mt-3 text-xs bg-white text-red-800 px-3 py-1 rounded-full inline-block font-medium border border-red-100">
              General, carece de acciones concretas.
            </div>
          </div>
        </div>
      </div>

      {/* Criterio 2 */}
      <div>
        <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">2. Manejo de Preguntas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            <div className="flex items-center text-blue-800 font-bold mb-3">
              <ThumbsUp className="w-5 h-5 mr-2" /> Práctica Esperada
            </div>
            <p className="text-slate-700 italic">Plantea una pregunta a la clase, hace una pausa de 5-7 segundos (tiempo de espera), y luego nombra a un estudiante para responder o pide levantar la mano.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
            <div className="flex items-center text-red-800 font-bold mb-3">
              <ThumbsDown className="w-5 h-5 mr-2" /> Práctica a Evitar
            </div>
            <p className="text-slate-700 italic">Hace una pregunta y se responde a sí mismo inmediatamente al ver que nadie contesta en 1 segundo.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CasosEspeciales = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Casos Particulares y Excepciones</h2>
      <p className="text-slate-600">Protocolos para situaciones fuera del estándar durante la observación.</p>
    </div>

    <div className="bg-white rounded-xl shadow-sm border-l-4 border-slate-800 p-6 mb-6">
      <div className="flex items-start">
        <AlertCircle className="w-6 h-6 text-slate-800 mr-4 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Fallas Técnicas (Aulas Híbridas o Virtuales)</h3>
          <p className="text-slate-600 mb-3">
            Si el docente experimenta fallas técnicas (internet, proyector) fuera de su control, esto <strong>no impactará negativamente</strong> su evaluación en el apartado de "Uso de Recursos".
          </p>
          <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 border border-slate-200">
            <strong>Criterio a evaluar:</strong> Se observará la capacidad de resiliencia y cómo el docente adapta la sesión para continuar el proceso de enseñanza.
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border-l-4 border-slate-800 p-6 mb-6">
      <div className="flex items-start">
        <AlertCircle className="w-6 h-6 text-slate-800 mr-4 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Evaluaciones y Exámenes</h3>
          <p className="text-slate-600">
            Si el evaluador asiste a una sesión que resulta ser exclusiva de aplicación de examen escrito, la observación se reprogramará. La auditoría requiere observar la dinámica de enseñanza-aprendizaje activa.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Calendario = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Calendario de Observaciones</h2>
      <p className="text-slate-600">Ciclo académico en curso. Las fechas exactas serán notificadas por correo institucional.</p>
    </div>

    <div className="relative border-l-2 border-blue-200 ml-3 pl-6 space-y-8 py-4">
      <div className="relative">
        <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[31px] top-1.5 border-4 border-white shadow"></div>
        <h3 className="text-lg font-bold text-slate-800">Fase 1: Autoevaluación y Diagnóstico</h3>
        <p className="text-sm text-blue-700 font-medium mb-2">15 Agosto - 30 Agosto</p>
        <p className="text-slate-600">Los docentes completan su cuestionario de autopercepción y revisan las rúbricas publicadas en esta plataforma.</p>
      </div>
      
      <div className="relative">
        <div className="absolute w-4 h-4 bg-red-600 rounded-full -left-[31px] top-1.5 border-4 border-white shadow"></div>
        <h3 className="text-lg font-bold text-slate-800">Fase 2: Observaciones en Aula</h3>
        <p className="text-sm text-red-700 font-medium mb-2">1 Septiembre - 30 Octubre</p>
        <p className="text-slate-600">Visitas presenciales y conexión a sesiones virtuales por parte del comité evaluador.</p>
      </div>

      <div className="relative">
        <div className="absolute w-4 h-4 bg-slate-300 rounded-full -left-[31px] top-1.5 border-4 border-white shadow"></div>
        <h3 className="text-lg font-bold text-slate-800">Fase 3: Entregas de Reportes</h3>
        <p className="text-sm text-slate-500 font-medium mb-2">15 Noviembre - 30 Noviembre</p>
        <p className="text-slate-600">Sesiones individuales de retroalimentación constructiva con cada docente.</p>
      </div>
    </div>
  </div>
);


// --- APP PRINCIPAL ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulación de carga inicial para la pantalla de "Loading"
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: 'inicio', label: 'Inicio / Dashboard', icon: LayoutDashboard },
    { id: 'marco', label: 'Marco Teórico', icon: BookOpen },
    { id: 'modelos', label: 'Modelos Pedagógicos', icon: GraduationCap },
    { id: 'rubrica', label: 'Rúbrica de Evaluación', icon: CheckSquare },
    { id: 'ejemplos', label: 'Ejemplos y Contraejemplos', icon: ThumbsUp },
    { id: 'casos', label: 'Casos Especiales', icon: AlertCircle },
    { id: 'calendario', label: 'Calendario', icon: CalendarDays },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio': return <Dashboard />;
      case 'marco': return <MarcoTeorico />;
      case 'modelos': return <ModelosPedagogicos />;
      case 'rubrica': return <Rubrica />;
      case 'ejemplos': return <Ejemplos />;
      case 'casos': return <CasosEspeciales />;
      case 'calendario': return <Calendario />;
      default: return <Dashboard />;
    }
  };

  // Pantalla de carga (Loading screen)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="relative flex justify-center items-center w-24 h-24 mb-6">
          {/* Círculo animado exterior - Azul */}
          <div className="absolute inset-0 border-4 border-t-blue-700 border-r-blue-700 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          {/* Círculo animado interior - Rojo */}
          <div className="absolute inset-2 border-4 border-t-transparent border-r-transparent border-b-red-600 border-l-red-600 rounded-full animate-spin-reverse"></div>
          {/* Icono central */}
          <GraduationCap className="w-10 h-10 text-blue-800" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-wide">Auditoría Docente</h1>
        <p className="text-slate-500 mt-2 animate-pulse">Preparando entorno institucional...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      
      {/* Navbar Móvil */}
      <div className="md:hidden bg-blue-800 text-white p-4 flex justify-between items-center shadow-md z-20">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-6 h-6 text-white" />
          <span className="font-bold text-lg">Auditoría Docente</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar de Navegación */}
      <aside className={`
        fixed md:static inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out z-10
        w-64 bg-white border-r border-slate-200 shadow-xl md:shadow-none h-full flex flex-col
      `}>
        <div className="p-6 hidden md:flex items-center space-x-3 border-b border-slate-100">
          <div className="bg-blue-800 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800">Evaluación<br/><span className="text-red-600 text-sm">Institucional</span></span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                      ${isActive 
                        ? 'bg-blue-50 text-blue-800 shadow-sm border border-blue-100' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 text-center">
            <p>Sistema de Auditoría v1.0</p>
            <p className="mt-1">© 2026 Comité Académico</p>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}