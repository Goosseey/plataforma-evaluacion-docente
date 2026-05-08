import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  GraduationCap, 
  CheckSquare, 
  ThumbsUp, 
  AlertCircle,
  CalendarDays,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Search,
  PieChart,
  Users,
  UserCheck,
  ClipboardList,
  Info,
  Languages,
  PlayCircle,
  Clock,
  MessageSquare,
  Globe,
  Download,
  Target,
  Layers,
  HelpCircle,
  Mail,
  Phone
} from 'lucide-react';

// --- COMPONENTES REUTILIZABLES ---

const Accordion = ({ title, children, defaultOpen = false, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-lg mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white print:border-none print:shadow-none print:mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center p-4 text-left transition-colors no-print ${isOpen ? 'bg-blue-50' : 'bg-slate-50 hover:bg-slate-100'}`}
      >
        <div className="flex items-center space-x-3">
          {Icon && <Icon className={`w-5 h-5 ${isOpen ? 'text-blue-700' : 'text-slate-500'}`} />}
          <span className={`font-bold ${isOpen ? 'text-blue-800' : 'text-slate-800'}`}>{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-700" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} p-4 border-t border-slate-200 text-slate-600 leading-relaxed bg-white print:block print:border-t-0 print:p-0`}>
        <h3 className="hidden print:block font-bold text-blue-800 text-lg mb-4 border-b pb-2">{title}</h3>
        {children}
      </div>
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

const VideoEmbed = ({ title, description, embedId, colorTheme = "blue" }) => (
  <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg mb-8 flex flex-col md:flex-row no-print border border-slate-800">
    <div className="md:w-1/2 aspect-video bg-black relative">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${embedId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
      <div className="flex items-center space-x-3 mb-3">
        <PlayCircle className={`w-7 h-7 ${colorTheme === 'indigo' ? 'text-indigo-400' : 'text-blue-400'}`} />
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex items-center text-xs font-medium text-slate-400 uppercase tracking-wider">
        <Info className="w-4 h-4 mr-2" />
        Video Institucional Preparatorio
      </div>
    </div>
  </div>
);

const CriterionTable = ({ number, title, levels, naLabel, note }) => {
  const getScoreColor = (score) => {
    switch (score) {
      case 5: return 'text-green-700 bg-green-50/50'; 
      case 4: return 'text-lime-600 bg-lime-50/50';   
      case 3: return 'text-yellow-600 bg-yellow-50/50'; 
      case 2: return 'text-red-600 bg-red-50/50';       
      case 1: return 'text-rose-900 bg-rose-50/50';     
      default: return 'text-slate-600';                 
    }
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden mb-6 print:border-slate-300 print:break-inside-avoid">
      <div className="bg-slate-100 p-4 border-b border-slate-200 print:bg-slate-50">
        <h4 className="font-bold text-slate-800 flex items-start">
          <span className="text-blue-700 mr-2 mt-0.5">{number}</span>
          <span>{title}</span>
        </h4>
        {note && <p className="text-[11px] text-slate-500 mt-2 uppercase font-bold tracking-wider italic bg-slate-200/50 p-2 rounded print:bg-transparent print:p-0">{note}</p>}
      </div>
      <table className="w-full text-left border-collapse text-sm">
        <tbody className="text-slate-600">
          {levels.map((level, idx) => {
            const colorClass = getScoreColor(level.score);
            return (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                <td className={`p-3 w-12 text-center font-bold align-top ${colorClass}`}>
                  {level.score}
                </td>
                <td className="p-3 align-top">{level.text}</td>
              </tr>
            );
          })}
          {naLabel && (
            <tr className="bg-slate-50">
              <td className="p-3 w-12 text-center font-bold text-slate-500 align-top">0</td>
              <td className="p-3 italic align-top">{naLabel}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const EscalaObjetiva = () => (
  <div className="bg-white rounded-lg p-5 border border-blue-100 text-sm mb-6 shadow-sm print:shadow-none print:border-slate-300">
    <h4 className="font-bold text-slate-800 mb-3 tracking-wider">ESCALA DE EVALUACIÓN</h4>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-700 font-bold rounded mr-2">5</span> Sobresaliente</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-lime-100 text-lime-600 font-bold rounded mr-2">4</span> Destacado</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-yellow-100 text-yellow-600 font-bold rounded mr-2">3</span> Satisfactorio</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-red-100 text-red-600 font-bold rounded mr-2">2</span> Aceptable</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-rose-100 text-rose-900 font-bold rounded mr-2">1</span> Incumplimiento</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded mr-2">0</span> No aplica</div>
    </div>
  </div>
);

const LineamientosGenerales = () => (
  <Accordion title="Propósito y Lineamientos de Aplicación del Instrumento" icon={Info} defaultOpen={false}>
    <div className="space-y-8 text-sm text-slate-700 p-2">
      <div>
        <h4 className="font-bold text-blue-800 text-base mb-2">Propósito del instrumento de observación de clases:</h4>
        <p className="mb-3 text-justify">
          La presente rúbrica tiene como finalidad documentar conductas, acciones e interacciones observables durante una sesión de clase. La evaluación se centra exclusivamente en evidencia observable dentro del periodo de observación y no constituye, por sí sola, una valoración integral del desempeño profesional del docente.
        </p>
        <p className="font-semibold mb-2">La aplicación del instrumento busca:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>identificar prácticas observables durante la sesión,</li>
          <li>promover criterios homogéneos entre observadores,</li>
          <li>y reducir interpretaciones subjetivas durante el proceso de evaluación.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-blue-800 text-base mb-4 border-b pb-2">Principios de aplicación</h4>
        
        <div className="mb-5">
          <h5 className="font-bold text-slate-800 mb-2">1. Evaluar únicamente lo observable</h5>
          <p className="mb-2">La valoración deberá realizarse únicamente con base en acciones, interacciones o evidencias observadas directamente durante la sesión. No deberán inferirse:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
            <ul className="list-disc pl-4 space-y-1">
              <li>intenciones del docente,</li>
              <li>emociones,</li>
              <li>motivación estudiantil,</li>
            </ul>
            <ul className="list-disc pl-4 space-y-1">
              <li>dominio disciplinar total,</li>
              <li>aprendizaje alcanzado,</li>
              <li>ni estados internos del grupo.</li>
            </ul>
          </div>
        </div>

        <div className="mb-5">
          <h5 className="font-bold text-slate-800 mb-2">2. Evitar interpretaciones subjetivas</h5>
          <p className="mb-2">La asignación de niveles no deberá basarse en percepciones generales como:</p>
          <ul className="list-disc pl-8 space-y-1 italic text-slate-500 mb-3">
            <li>“la clase se sintió dinámica”,</li>
            <li>“el docente parecía dominar el tema”,</li>
            <li>“los estudiantes parecían interesados”,</li>
            <li>“el ambiente fue agradable”.</li>
          </ul>
          <p className="bg-slate-50 border-l-4 border-blue-600 p-3 rounded">La valoración deberá sustentarse exclusivamente en los elementos descritos en cada criterio y escala.</p>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 mb-2">3. Considerar el contexto de la sesión</h5>
          <p className="mb-2">La observación deberá considerar:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>modalidad de la clase, duración de la sesión y estructura de la actividad,</li>
            <li>nivel del grupo, tipo de contenido y dinámica desarrollada durante la observación.</li>
          </ul>
          <p className="mt-2 font-medium text-slate-600">No todos los criterios necesariamente serán observables en todas las sesiones.</p>
        </div>
      </div>

      <div className="bg-slate-800 text-white rounded-xl p-6 shadow-sm">
        <h4 className="font-bold text-lg mb-3 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
          Criterios para asignar “No aplica / No observable”
        </h4>
        <p className="mb-3 text-slate-300">El observador podrá utilizar NA cuando:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-200">
          <li>no se observe participación estudiantil suficiente,</li>
          <li>la sesión no contemple interacción verbal o no existan actividades grupales,</li>
          <li>no sea posible observar el inicio o cierre de la sesión,</li>
          <li>el criterio dependa de una dinámica no desarrollada durante la observación,</li>
          <li>o no exista evidencia observable suficiente para valorar objetivamente el criterio.</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-blue-800 text-base mb-2">Alcances y limitaciones del instrumento</h4>
          <p className="mb-2 font-semibold">La presente rúbrica:</p>
          <ul className="list-disc pl-6 space-y-1 mb-2">
            <li>evalúa evidencia observable durante una sesión específica,</li>
            <li>no sustituye procesos integrales de evaluación docente,</li>
            <li>y no permite determinar de manera concluyente:
              <ul className="list-[circle] pl-6 mt-1 space-y-1 text-slate-500 italic">
                <li>aprendizaje alcanzado,</li>
                <li>dominio disciplinar absoluto,</li>
                <li>competencia lingüística total,</li>
                <li>ni efectividad global de enseñanza.</li>
              </ul>
            </li>
          </ul>
          <p className="text-xs text-slate-500 bg-slate-100 p-2 rounded">Los resultados deberán interpretarse considerando el contexto específico de la observación.</p>
        </div>

        <div>
          <h4 className="font-bold text-blue-800 text-base mb-2">Consideraciones éticas</h4>
          <p className="mb-2 font-semibold">La observación docente deberá realizarse bajo principios de:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>respeto,</li>
            <li>confidencialidad,</li>
            <li>objetividad,</li>
            <li>consistencia,</li>
            <li>y apego a los criterios establecidos en el instrumento.</li>
          </ul>
          <p className="bg-slate-50 border-l-4 border-blue-600 p-3 rounded text-sm">Las valoraciones deberán sustentarse exclusivamente en evidencia observable registrada durante la sesión.</p>
        </div>
      </div>
    </div>
  </Accordion>
);

// --- VISTAS PRINCIPALES ---

const Introduccion = ({ setActiveTab }) => {
  // Datos para la tabla de navegación dinámica
  const navItems = [
    { 
      id: 'inicio', 
      title: 'Modelo de Evaluación', 
      desc: 'Conoce cómo se compone tu calificación final (Modelo 360°).', 
      icon: LayoutDashboard, 
      bg: 'bg-blue-100', text: 'text-blue-700', hoverText: 'group-hover:text-blue-700' 
    },
    { 
      id: 'calendario', 
      title: 'Calendario y Fases', 
      desc: 'Revisa las semanas clave del cuatrimestre y cuándo recibirás tu retroalimentación.', 
      icon: CalendarDays, 
      bg: 'bg-indigo-100', text: 'text-indigo-700', hoverText: 'group-hover:text-indigo-700' 
    },
    { 
      id: 'rubricas', 
      title: 'Rúbricas de Evaluación', 
      desc: 'Explora a detalle los criterios que se observan en tu clase, con la opción de descargar tu propio PDF.', 
      icon: CheckSquare, 
      bg: 'bg-emerald-100', text: 'text-emerald-700', hoverText: 'group-hover:text-emerald-700' 
    },
    { 
      id: 'marco', 
      title: 'Marco Teórico', 
      desc: 'Descubre las bases pedagógicas y el "por qué" detrás de nuestra metodología.', 
      icon: BookOpen, 
      bg: 'bg-violet-100', text: 'text-violet-700', hoverText: 'group-hover:text-violet-700' 
    },
    { 
      id: 'faq', 
      title: 'FAQ y Contacto', 
      desc: 'Resuelve tus dudas más comunes y comunícate directamente con la coordinación.', 
      icon: HelpCircle, 
      bg: 'bg-orange-100', text: 'text-orange-700', hoverText: 'group-hover:text-orange-700' 
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a la Plataforma de Evaluación Docente</h1>
        <p className="text-blue-100 text-lg leading-relaxed">
          Hemos diseñado este espacio pensando en ti. Sabemos que la labor docente es desafiante, dinámica y requiere de una vocación inmensa. Nuestro objetivo principal no es auditarte desde una postura punitiva, sino acompañarte en tu crecimiento profesional.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Crecimiento Conjunto" icon={ThumbsUp} borderColor="border-blue-500">
          <p>Queremos transitar de una "inspección" tradicional hacia una cultura de práctica reflexiva. Las rúbricas y herramientas que encontrarás aquí están diseñadas para darte claridad, certeza y apoyo en tu labor diaria.</p>
        </Card>
        <Card title="Transparencia Total" icon={Search} borderColor="border-green-500">
          <p>Aquí no hay secretos. Tienes a tu disposición exactamente los mismos instrumentos y criterios que utilizamos los observadores. Queremos que conozcas las expectativas institucionales para que te sientas seguro frente al grupo.</p>
        </Card>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-10">
        <div className="bg-slate-50 border-b border-slate-200 p-6 md:px-8 flex items-center">
          <Menu className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-slate-800">¿Cómo navegar por la plataforma?</h3>
            <p className="text-slate-500 text-sm mt-1">Haz clic en cualquier sección de esta tabla para dirigirte a ella de inmediato.</p>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {navItems.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setActiveTab(item.id)} 
              className="flex items-center p-6 md:px-8 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className={`p-4 rounded-2xl mr-6 transition-transform group-hover:scale-110 shadow-sm flex-shrink-0 ${item.bg} ${item.text}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-bold text-slate-800 mb-1 ${item.hoverText} transition-colors`}>
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ml-4 flex-shrink-0">
                <span className={`text-sm font-bold ${item.text} bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200`}>
                  Ir a sección &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
        <PieChart className="w-64 h-64" />
      </div>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-4">Modelo de Evaluación 360°</h1>
        <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
          Un modelo institucional diseñado para proporcionar una evaluación integral y objetiva del desempeño docente, considerando múltiples perspectivas a lo largo del cuatrimestre para impulsar la mejora continua y la excelencia académica de la Universidad Tecnológica El Retoño.
        </p>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Composición de tu Calificación Final</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Estudiantes (30%)" icon={Users} borderColor="border-blue-600">
          <p>Evaluación en línea realizada por los alumnos sobre la dinámica y claridad en el aula.</p>
        </Card>
        <Card title="Observación en Aula (30%)" icon={Search} borderColor="border-red-600">
          <p>Evaluación directa de la práctica docente mediante rúbricas objetivas y evidencia observable.</p>
        </Card>
        <Card title="Jefe de Departamento (15%)" icon={ClipboardList} borderColor="border-blue-600">
          <p>Evaluación del cumplimiento de lineamientos institucionales y administrativos.</p>
        </Card>
        <Card title="Pares Académicos (15%)" icon={UserCheck} borderColor="border-slate-600">
          <p>Retroalimentación constructiva de colegas sobre planeación y estrategias pedagógicas.</p>
        </Card>
        <Card title="Autoevaluación (10%)" icon={BookOpen} borderColor="border-red-600">
          <p>Reflexión personal sobre el propio desempeño y áreas de oportunidad.</p>
        </Card>
      </div>
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm flex items-start">
        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <p><strong>Importante:</strong> Para obtener un resultado final completo, es obligatorio contar con la participación en los cinco componentes del modelo 360°.</p>
      </div>
    </div>
  </div>
);

const MarcoTeorico = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Fundamentos de la Observación y Evaluación de Clase</h2>
      <p className="text-slate-600">
        Este documento presenta las bases pedagógicas que sustentan nuestros procesos. El objetivo es transitar de una "inspección" hacia una práctica reflexiva basada en la evidencia y el diseño intencional. Queremos que esta herramienta sea tu aliada.
      </p>
    </div>

    <Accordion title="1. El Pilar del Alineamiento Constructivo" icon={BookOpen} defaultOpen={false}>
      <div className="space-y-3">
        <p className="text-justify text-slate-700">
          La evaluación de tu clase no es un evento aislado, sino la verificación de un "contrato pedagógico". Entendemos que el aprendizaje profundo ocurre cuando hay coherencia total entre lo que esperamos, lo que hacemos y lo que evaluamos. Según John Biggs, debe existir un vínculo indisoluble entre:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li><strong>Resultados de Aprendizaje (RAE):</strong> Lo que el estudiante debe saber hacer.</li>
          <li><strong>Actividades de Enseñanza (AEA):</strong> Lo que ocurre de manera viva en tu aula.</li>
          <li><strong>Tareas de Evaluación:</strong> Cómo verificamos juntos ese logro.</li>
        </ul>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-r-lg">
          <p className="text-sm text-blue-900">
            <strong>En la práctica:</strong> Buscamos evidenciar que vas más allá de "dar un tema". Valoramos cómo alineas tus preguntas y actividades para que el estudiante construya su propio conocimiento. ¡Si el objetivo es analizar, sabemos que tu clase no será solo una exposición pasiva!
          </p>
        </div>
      </div>
    </Accordion>

    <Accordion title="2. Diseño Inverso: Planificar con el fin en mente" icon={Target}>
      <div className="space-y-3">
        <p className="text-justify text-slate-700">
          Aplicamos la filosofía del <em>Backward Planning</em> (Wiggins & McTighe). En lugar de planificar "hacia adelante" (libro → actividad → examen), te animamos a diseñar a la inversa la arquitectura de tu clase:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700">
          <li><strong>Identificar resultados deseados:</strong> ¿Qué comprensión perdurable quieres lograr en ellos?</li>
          <li><strong>Determinar evidencia aceptable:</strong> ¿Qué debe hacer el alumno para demostrarte que aprendió?</li>
          <li><strong>Planificar experiencias:</strong> Diseñar la instrucción exacta para alcanzar esa evidencia.</li>
        </ol>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-r-lg">
          <p className="text-sm text-blue-900">
            <strong>En la práctica:</strong> Valoramos que cada minuto de tu sesión sea un vector cinético hacia la meta final, evitando actividades que solo mantienen ocupado al alumno pero no generan transferencia cognitiva.
          </p>
        </div>
      </div>
    </Accordion>

    <Accordion title="3. Diferenciación: Contenido vs. Idiomas" icon={Layers}>
      <div className="space-y-3">
        <p className="text-justify text-slate-700">
          Comprendemos que no todas las clases son iguales. Nuestro instrumento reconoce que la naturaleza del aprendizaje dicta cómo se interactúa en el aula:
        </p>
        
        <div className="overflow-x-auto mt-5 rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="p-4 bg-slate-100 text-slate-700 font-bold border-b border-slate-200 w-1/4">
                  Dimensión
                </th>
                <th className="p-4 bg-blue-600 text-white font-bold border-b border-blue-700 w-[37.5%]">
                  <div className="flex items-center"><BookOpen className="w-4 h-4 mr-2"/> Clases de Contenido</div>
                </th>
                <th className="p-4 bg-indigo-600 text-white font-bold border-b border-indigo-700 w-[37.5%]">
                  <div className="flex items-center"><Globe className="w-4 h-4 mr-2"/> Clases de Idiomas</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { dim: "Enfoque Principal", cont: "Dominio conceptual y relacional del tema.", idio: "Competencia comunicativa y uso de la lengua." },
                { dim: "Uso del Lenguaje", cont: "Vehículo para entender conceptos.", idio: "El lenguaje es el objeto de estudio y la herramienta." },
                { dim: "Interacción", cont: "Enfocada en la construcción de argumentos.", idio: "Enfocada en la producción (oral/escrita) en L2." },
                { dim: "Criterio Clave", cont: "Rigor académico y profundidad.", idio: "Exposición al idioma meta y retroalimentación de errores." },
              ].map((row, i) => (
                <tr key={i} className="group transition-colors cursor-default">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50 group-hover:bg-slate-100 transition-colors border-r border-slate-100">
                    {row.dim}
                  </td>
                  <td className="p-4 text-slate-700 bg-blue-50/30 group-hover:bg-blue-50 transition-colors border-r border-slate-100">
                    {row.cont}
                  </td>
                  <td className="p-4 text-slate-700 bg-indigo-50/30 group-hover:bg-indigo-50 transition-colors">
                    {row.idio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Accordion>

    <Accordion title="4. El valor del Planning y la Gestión" icon={Clock}>
      <div className="space-y-3">
        <p className="text-justify text-slate-700">
          Sabemos que la planificación diaria no es una carga administrativa, sino una hoja de ruta estratégica. Un buen plan te permite:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 mt-2">
          <li><strong>Gestión del tiempo:</strong> Evitar interrupciones y transiciones muertas.</li>
          <li><strong>Equidad y Accesibilidad:</strong> Anticipar andamiajes (<em>scaffolding</em>) para estudiantes que necesitan apoyo adicional.</li>
          <li><strong>Atmósfera de Clase:</strong> Crear un entorno seguro de respeto, donde equivocarse sea visto como una gran oportunidad de aprendizaje.</li>
        </ul>
      </div>
    </Accordion>

    <Accordion title="5. Alcances y Limitaciones (No somos infalibles)" icon={AlertCircle}>
      <div className="space-y-4 text-slate-700">
        <p className="text-justify">
          Somos muy conscientes de que la observación de una sesión tiene sus fronteras naturales. Reconocemos que:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Naturaleza Episódica:</strong> Evaluamos un "instante" del proceso educativo, no tu progreso a largo plazo.</li>
          <li><strong>Foco en lo Observable:</strong> Medimos comportamientos y productos visibles, pero no podemos capturar por completo los procesos internos de pensamiento del estudiante.</li>
          <li><strong>Dependencia del Contexto:</strong> Factores externos (ánimo del grupo, fallas técnicas) influyen en el desempeño de la sesión y lo tomamos en cuenta.</li>
        </ul>
        <div className="pt-4 border-t border-slate-100">
          <p className="font-bold text-blue-800 mb-2">
            Conclusión: Hacia la Excelencia Docente
          </p>
          <p className="text-justify">
            Aunque ninguna evaluación es completamente perfecta, las rúbricas nos permiten contar con criterios más claros y consistentes para acompañar la mejora continua de la práctica docente.
          </p>
        </div>
      </div>
    </Accordion>

    <Accordion title="6. Referencias Bibliográficas" icon={FileText}>
      <div className="space-y-4 text-sm text-slate-600 pl-4 py-2">
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Biggs, J. B. (1996). Enhancing teaching through constructive alignment. <em>Higher Education</em>, 32(3), 347-364. https://doi.org/10.1007/BF00138871</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Ellis, R. (2003). <em>Task-based language learning and teaching</em>. Oxford University Press.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Krashen, S. D. (1981). <em>Second language acquisition and second language learning</em>. Pergamon Press.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Wiggins, G., & McTighe, J. (2005). <em>Understanding by design</em> (2nd ed.). Association for Supervision and Curriculum Development.</p>
      </div>
    </Accordion>
  </div>
);

const Calendario = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Cronograma de Evaluación 360°</h2>
      <p className="text-slate-600">Fechas y fases clave del proceso de evaluación durante el cuatrimestre.</p>
    </div>

    <div className="relative border-l-4 border-blue-200 ml-4 pl-8 space-y-10 py-4">
      
      {/* 1. Observación de Clase */}
      <div className="relative">
        <div className="absolute w-6 h-6 bg-blue-600 rounded-full -left-[43px] top-0 border-4 border-white shadow-md flex items-center justify-center"></div>
        <h3 className="text-xl font-bold text-slate-800">Observación de Clase en Aula</h3>
        <p className="text-sm text-blue-700 font-bold mb-2 tracking-wide uppercase">Semanas 2 a 4 | Semanas 6 a 9</p>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100 mt-2">
          <p className="text-slate-700 mb-4">Evaluaciones directas de la práctica docente por parte de la coordinación y equipo evaluador.</p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg text-sm text-slate-600 space-y-3">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
              <p><strong>Semanas 5 y 10:</strong> No se realizan observaciones debido a la aplicación institucional de los exámenes de primer y segundo parcial.</p>
            </div>
            <div className="flex items-start">
              <CalendarDays className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
              <p><strong>Semanas 11 y 12:</strong> Período reservado de manera exclusiva para programar observaciones extemporáneas en caso de requerirse.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 2. Evaluación entre Pares */}
      <div className="relative">
        <div className="absolute w-6 h-6 bg-indigo-600 rounded-full -left-[43px] top-0 border-4 border-white shadow-md flex items-center justify-center"></div>
        <h3 className="text-xl font-bold text-slate-800">Evaluación entre Pares</h3>
        <p className="text-sm text-indigo-700 font-bold mb-2 tracking-wide uppercase">Semana 9</p>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100 mt-2">
          <p className="text-slate-700">
            Fase de retroalimentación constructiva colegiada. Cada Jefe de Departamento se encarga de dar seguimiento oportuno a esta evaluación, proporcionando a su cuerpo docente:
          </p>
          <ul className="list-disc pl-5 mt-3 text-sm text-slate-600 space-y-1">
            <li>El nombre específico del colega que evaluarán.</li>
            <li>Las fechas límite para realizar la actividad.</li>
            <li>El enlace directo para acceder a la rúbrica oficial.</li>
          </ul>
        </div>
      </div>

      {/* 3. Jefe de Departamento y Autoevaluación */}
      <div className="relative">
        <div className="absolute w-6 h-6 bg-red-600 rounded-full -left-[43px] top-0 border-4 border-white shadow-md flex items-center justify-center"></div>
        <h3 className="text-xl font-bold text-slate-800">Evaluación del Jefe de Departamento y Autoevaluación</h3>
        <p className="text-sm text-red-700 font-bold mb-2 tracking-wide uppercase">Semana 10</p>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h4 className="font-bold text-red-800 mb-1">Jefe de Departamento</h4>
              <p className="text-sm text-slate-700">Los jefes de departamento llevan a cabo la evaluación del desempeño general y administrativo de su plantilla docente.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-1">Autoevaluación Docente</h4>
              <p className="text-sm text-slate-700">Se enviará el enlace de acceso al cuestionario de autoevaluación directamente a los correos institucionales de los maestros.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Estudiantes */}
      <div className="relative">
        <div className="absolute w-6 h-6 bg-green-600 rounded-full -left-[43px] top-0 border-4 border-white shadow-md flex items-center justify-center"></div>
        <h3 className="text-xl font-bold text-slate-800">Evaluación de Estudiantes</h3>
        <p className="text-sm text-green-700 font-bold mb-2 tracking-wide uppercase">Semana 10</p>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-green-200 mt-2 border-l-4 border-l-green-500">
          <p className="text-slate-800 font-medium">Acompañamiento Tutorial</p>
          <p className="text-sm text-slate-600 mt-2">
            La evaluación del docente por parte de sus alumnos se lleva a cabo en la plataforma institucional. Los tutores de grupo realizan un acompañamiento activo durante esta semana para asegurar que los estudiantes completen este proceso fundamental.
          </p>
        </div>
      </div>

      {/* 5. Entrega de Resultados */}
      <div className="relative">
        <div className="absolute w-6 h-6 bg-purple-600 rounded-full -left-[43px] top-0 border-4 border-white shadow-md flex items-center justify-center"></div>
        <h3 className="text-xl font-bold text-slate-800">Entrega de Resultados</h3>
        <p className="text-sm text-purple-700 font-bold mb-2 tracking-wide uppercase">Semanas 14 y 15</p>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100 mt-2">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
            <h4 className="font-bold text-indigo-900 mb-1 flex items-center">
              <Mail className="w-4 h-4 mr-2" /> Reporte Final y Retroalimentación
            </h4>
            <p className="text-sm text-indigo-800 mb-2">
              En la <strong>semana 14</strong>, se entrega el reporte final a los Jefes de Departamento.
            </p>
            <p className="text-sm text-indigo-800">
              Por consiguiente, los docentes obtienen su resultado final oficial entre la <strong>semana 14 y 15</strong>.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
);

const FaqContacto = () => (
  <div className="space-y-8 animate-fade-in max-w-4xl">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Preguntas Frecuentes (FAQ) y Contacto</h2>
      <p className="text-slate-600">Resolvemos tus dudas más comunes y te dejamos nuestros medios de contacto directo.</p>
    </div>

    <div className="space-y-2">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <HelpCircle className="w-6 h-6 mr-2 text-blue-600" /> Dudas Comunes
      </h3>
      <Accordion title="¿Qué pasa si me pongo nervioso o cometo un error en la observación?" icon={MessageSquare}>
        <p className="text-slate-700">
          ¡No pasa absolutamente nada! Es completamente normal y humano. De hecho, evaluamos cómo manejas el error frente al grupo; verlo como una oportunidad de aprendizaje es una excelente práctica. No buscamos una clase "perfecta" e irreal, sino tu práctica cotidiana.
        </p>
      </Accordion>
      <Accordion title="¿Tengo que preparar un 'show' especial para el día que me observen?" icon={MessageSquare}>
        <p className="text-slate-700">
          Para nada. Queremos ver tu autenticidad. Prepara tu clase exactamente como lo haces todos los días, apegándote a tu planeación y a los criterios que ya conoces en las rúbricas publicadas en esta plataforma. La naturalidad es tu mejor herramienta.
        </p>
      </Accordion>
      <Accordion title="¿Qué pasa si un criterio de la rúbrica simplemente no aplica para mi tema hoy?" icon={MessageSquare}>
        <p className="text-slate-700">
          Existe el criterio <strong>NA (No Aplica)</strong> precisamente para estos casos. Si tu materia es 100% teórica en esa sesión o hubo una falla técnica ajena a ti, el observador marcará NA y este punto no te penalizará ni afectará negativamente tu calificación.
        </p>
      </Accordion>
      <Accordion title="¿Cuándo y cómo sabré mis resultados de la observación?" icon={MessageSquare}>
        <p className="text-slate-700">
          Una vez concluido el periodo de evaluación, tu Director o Jefe de Departamento recibirá el reporte. Entre las semanas 14 y 15 obtendrás tus resultados oficiales, los cuales sirven para trazar un plan de crecimiento formativo en conjunto.
        </p>
      </Accordion>
    </div>

    <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>
      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center relative z-10">
        <Users className="w-6 h-6 mr-3 text-blue-600" /> Contacto Directo
      </h3>
      <div className="space-y-4 relative z-10">
        <p className="text-slate-600 mb-4">
          Si tienes alguna duda adicional, sugerencia o comentario sobre el proceso de evaluación, estoy para escucharte.
        </p>
        <div className="flex items-center text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <UserCheck className="w-6 h-6 mr-3 text-slate-400" />
          <div>
            <p className="font-bold text-lg">Luis Ángel Márquez Gallardo</p>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Coordinador de Evaluación Docente</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <a href="mailto:evaluaciondocenteonline@utr.edu.mx" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow">
            <Mail className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
            <span className="text-sm font-medium break-all">evaluaciondocenteonline@utr.edu.mx</span>
          </a>
          <a href="mailto:luisangel.marquez@utr.edu.mx" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow">
            <Mail className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
            <span className="text-sm font-medium break-all">luisangel.marquez@utr.edu.mx</span>
          </a>
          <div className="flex items-center text-slate-600 bg-white border border-slate-200 p-4 rounded-xl shadow-sm col-span-1 md:col-span-2">
            <Phone className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
            <span className="text-sm font-medium">449 786 1786 <strong className="ml-1 text-slate-800">EXT 1127</strong> <span className="text-xs text-slate-400 ml-2 italic hidden md:inline">(Aunque la mayoría del tiempo estoy observando 😉)</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- SECCIONES DE RÚBRICAS INDIVIDUALES ---

const ContenidoAula = () => (
  <div className="animate-fade-in">
    
    <VideoEmbed 
      title="Guía de Observación: Materias de Contenido" 
      description="Te invitamos a ver este breve video preparatorio. Descubre qué aspectos clave observamos en tu sesión y cómo nuestra rúbrica busca apoyar tu crecimiento profesional reconociendo tu esfuerzo diario en el aula."
      embedId="-nHLAzFIaF8"
      colorTheme="blue"
    />

    <Accordion title="1. GOOGLE CLASSROOM" icon={FileText} defaultOpen={false}>
      <CriterionTable 
        number="1.1" 
        title="Estructura base de Classroom"
        levels={[
          {score: 5, text: "Todos los elementos requeridos (Intro, RA, Temas, Horario, Criterios) visibles y actualizados."},
          {score: 4, text: "Falta un elemento o uno está desactualizado."},
          {score: 3, text: "Faltan dos elementos requeridos."},
          {score: 2, text: "Información muy limitada o poco accesible."},
          {score: 1, text: "Ausencia casi total de elementos requeridos."}
        ]}
      />
      <CriterionTable 
        number="1.2" 
        title="Criterios de evaluación en evidencias/actividades"
        levels={[
          {score: 5, text: "Todas las evidencias o actividades evaluables observadas incluyen criterios de evaluación identificables."},
          {score: 4, text: "Falta criterio de evaluación en una sola evidencia o actividad evaluable observada."},
          {score: 3, text: "Entre aproximadamente la mitad y menos de todas las evidencias observadas incluyen criterios de evaluación identificables."},
          {score: 2, text: "Menos de la mitad de las evidencias observadas incluyen criterios de evaluación identificables."},
          {score: 1, text: "Ninguna evidencia o actividad evaluable incluye criterios de evaluación identificables."}
        ]}
        naLabel="No se observaron evidencias o actividades evaluables durante la revisión."
      />
    </Accordion>

    <Accordion title="2. CONTENIDO DE LA MATERIA" icon={BookOpen} defaultOpen={false}>
      <CriterionTable 
        number="2.1" 
        title="Dominio y Explicación de Contenidos"
        note="Evalúa conductas observables durante la sesión."
        levels={[
          {score: 5, text: "Explica contenidos, responde preguntas, utiliza ejemplos/referencias y realiza conexiones entre conceptos del tema."},
          {score: 4, text: "Explica contenidos, responde preguntas y utiliza ejemplos o referencias relacionadas."},
          {score: 3, text: "Explica contenidos relacionados con la sesión y responde preguntas relacionadas con el tema."},
          {score: 2, text: "Presenta información relacionada pero no utiliza ejemplos, referencias o conexiones entre conceptos."},
          {score: 1, text: "No se observan explicaciones relacionadas con el contenido de la sesión."}
        ]}
        naLabel="No fue posible observar exposición o interacción relacionada con el contenido disciplinar."
      />
      <CriterionTable 
        number="2.2" 
        title="Variedad de Dinámicas y Recursos"
        note="La complejidad cognitiva requiere evidencia complementaria."
        levels={[
          {score: 5, text: "Utiliza diferentes dinámicas de trabajo, distintos recursos o materiales y más de una forma de participación estudiantil."},
          {score: 4, text: "Utiliza diferentes dinámicas de trabajo y distintos recursos o materiales durante la sesión."},
          {score: 3, text: "Utiliza más de una dinámica o recurso durante la sesión."},
          {score: 2, text: "Utiliza una sola dinámica o recurso durante toda la sesión."},
          {score: 1, text: "No se observan actividades o recursos diferenciados durante la sesión."}
        ]}
        naLabel="No fue posible observar actividades de enseñanza durante la sesión."
      />
      <CriterionTable 
        number="2.3" 
        title="Relación con Ejemplos y Aplicación"
        levels={[
          {score: 5, text: "Se presentan múltiples ejemplos o aplicaciones prácticas relacionados explícitamente con el contenido."},
          {score: 4, text: "Se presentan al menos dos ejemplos o aplicaciones prácticas relacionados explícitamente con el contenido."},
          {score: 3, text: "Se presenta un ejemplo o aplicación práctica relacionado explícitamente con el contenido."},
          {score: 2, text: "Se mencionan ejemplos o aplicaciones pero sin relación explícita con el contenido desarrollado."},
          {score: 1, text: "No se observan ejemplos, situaciones o aplicaciones relacionadas con el contenido."}
        ]}
        naLabel="No fue posible observar desarrollo de contenido disciplinar durante la sesión."
      />
      <CriterionTable 
        number="2.4" 
        title="Información Actualizada del Área"
        levels={[
          {score: 5, text: "Utiliza referencias recientes, ejemplos actuales y recursos sobre avances o tendencias del área."},
          {score: 4, text: "Utiliza referencias recientes y ejemplos actuales relacionados."},
          {score: 3, text: "Menciona información o ejemplos recientes relacionados."},
          {score: 2, text: "Presenta contenido sin referencias recientes o actualizadas observables."},
          {score: 1, text: "No se observan referencias relacionadas con información actualizada del área disciplinar."}
        ]}
        naLabel="La naturaleza del contenido desarrollado no requiere actualización observable durante la sesión."
      />
      <CriterionTable 
        number="2.5" 
        title="Relación Actividades vs. Contenido/Objetivo"
        levels={[
          {score: 5, text: "Las actividades se relacionan con el contenido, requieren aplicación del contenido y corresponden con el objetivo presentado."},
          {score: 4, text: "Las actividades se relacionan con el contenido de la sesión y corresponden con el objetivo presentado."},
          {score: 3, text: "Las actividades se relacionan con el contenido de la sesión."},
          {score: 2, text: "Las actividades presentan relación limitada con el contenido desarrollado."},
          {score: 1, text: "No se observa relación entre las actividades y el contenido de la sesión."}
        ]}
        naLabel="No fue posible observar actividades relacionadas con el contenido."
      />
      <CriterionTable 
        number="2.6" 
        title="Vinculación con el Contexto Profesional"
        levels={[
          {score: 5, text: "Relaciona el contenido con situaciones profesionales, utiliza ejemplos laborales y explica aplicaciones en el ejercicio profesional."},
          {score: 4, text: "Relaciona el contenido con situaciones profesionales y utiliza ejemplos del contexto laboral."},
          {score: 3, text: "Menciona aplicaciones profesionales relacionadas con el contenido."},
          {score: 2, text: "Hace referencias generales al ámbito profesional sin relacionarlas con el contenido."},
          {score: 1, text: "No se observan referencias al contexto profesional."}
        ]}
        naLabel="La naturaleza de la sesión no contempló relación observable con contexto profesional."
      />
      <CriterionTable 
        number="2.7" 
        title="Verificación de Comprensión y Retroalimentación"
        levels={[
          {score: 5, text: "Verifica comprensión del contenido, corrige errores, realiza preguntas del tema y proporciona retroalimentación."},
          {score: 4, text: "Verifica comprensión del contenido, corrige errores y proporciona retroalimentación."},
          {score: 3, text: "Verifica comprensión o proporciona retroalimentación relacionada con el contenido."},
          {score: 2, text: "Realiza comentarios generales sin verificar comprensión o retroalimentar contenido."},
          {score: 1, text: "No se observan acciones de verificación o retroalimentación durante la sesión."}
        ]}
        naLabel="No fue posible observar interacción suficiente para valorar retroalimentación."
      />
    </Accordion>

    <Accordion title="3. USO DE VOCABULARIO ESPECIALIZADO EN INGLÉS" icon={Languages} defaultOpen={false}>
      <CriterionTable 
        number="3.1" 
        title="Vocabulario Especializado en Inglés"
        levels={[
          {score: 5, text: "Utiliza vocabulario especializado, explica los términos utilizados y los relaciona con conceptos de la materia."},
          {score: 4, text: "Utiliza vocabulario especializado en inglés y explica los términos utilizados durante la sesión."},
          {score: 3, text: "Utiliza vocabulario especializado en inglés durante la sesión."},
          {score: 2, text: "Utiliza palabras o expresiones aisladas en inglés sin relación directa con conceptos de la materia."},
          {score: 1, text: "No se observa uso de vocabulario especializado en inglés durante la sesión."}
        ]}
        naLabel="La naturaleza de la sesión no contempló uso observable de vocabulario especializado."
      />
      <CriterionTable 
        number="3.2" 
        title="Respuesta a Intervenciones en Inglés"
        levels={[
          {score: 5, text: "Responde preguntas en inglés, solicita aclaraciones adicionales y amplía la explicación del contenido."},
          {score: 4, text: "Responde preguntas o dudas en inglés y proporciona explicaciones relacionadas con el contenido."},
          {score: 3, text: "Responde preguntas o dudas en inglés durante la sesión."},
          {score: 2, text: "Responde parcialmente en inglés o cambia inmediatamente al español durante la interacción."},
          {score: 1, text: "No se observan respuestas o interacción en inglés durante la sesión."}
        ]}
        naLabel="No se presentaron preguntas o intervenciones estudiantiles en inglés durante la sesión."
      />
      <CriterionTable 
        number="3.3" 
        title="Uso de Recursos en Inglés"
        levels={[
          {score: 5, text: "Utiliza lecturas, ejercicios y materiales adicionales en inglés relacionados con el contenido."},
          {score: 4, text: "Utiliza lecturas y ejercicios en inglés relacionados con el contenido."},
          {score: 3, text: "Utiliza al menos un recurso en inglés relacionado con el contenido."},
          {score: 2, text: "Presenta recursos en inglés sin utilizarlos durante la sesión."},
          {score: 1, text: "No se observan recursos en inglés durante la sesión."}
        ]}
        naLabel="La sesión no contempló uso observable de recursos didácticos."
      />
      <CriterionTable 
        number="3.4" 
        title="Ejemplos y Ejercicios en Inglés"
        levels={[
          {score: 5, text: "Incorpora ejemplos, incorpora ejercicios en inglés y relaciona ambos con el contenido de la sesión."},
          {score: 4, text: "Incorpora ejemplos y ejercicios en inglés durante la sesión."},
          {score: 3, text: "Incorpora ejemplos o ejercicios en inglés durante la sesión."},
          {score: 2, text: "Menciona ejemplos o ejercicios en inglés sin desarrollarlos durante la sesión."},
          {score: 1, text: "No se observan ejemplos o ejercicios en inglés durante la sesión."}
        ]}
        naLabel="La estructura de la sesión no contempló actividades o ejemplos observables."
      />
      <CriterionTable 
        number="3.5" 
        title="Participación y Producción Estudiantil en Inglés"
        levels={[
          {score: 5, text: "Solicita participación en inglés, solicita uso de vocabulario técnico y desarrolla actividades que requieren interacción en inglés."},
          {score: 4, text: "Solicita participación en inglés y solicita uso de vocabulario relacionado con la materia."},
          {score: 3, text: "Solicita intervenciones breves en inglés durante la sesión."},
          {score: 2, text: "Permite uso opcional del inglés sin solicitar participación directa."},
          {score: 1, text: "No se observan oportunidades de uso del inglés durante la sesión."}
        ]}
        naLabel="La estructura de la sesión no contempló actividades de participación o producción oral observable."
      />
      <CriterionTable 
        number="3.6" 
        title="Inglés en Explicación e Instrucciones"
        levels={[
          {score: 5, text: "Utiliza inglés durante la explicación del contenido, en instrucciones y durante la interacción con estudiantes."},
          {score: 4, text: "Utiliza inglés durante la explicación del contenido y en instrucciones relacionadas con la sesión."},
          {score: 3, text: "Utiliza inglés en algunos momentos de la explanation o interacción."},
          {score: 2, text: "Utiliza palabras o expresiones aisladas en inglés durante la sesión."},
          {score: 1, text: "No se observa uso del inglés durante la sesión."}
        ]}
        naLabel="La naturaleza de la sesión no contempló uso observable del inglés."
      />
    </Accordion>

    <Accordion title="4. DESARROLLO DE LA CLASE" icon={PlayCircle} defaultOpen={false}>
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center border-b pb-2">
          <Clock className="w-5 h-5 mr-2 text-blue-600" /> Momentos Iniciales
        </h3>
        <CriterionTable 
          number="4.1" 
          title="Introducción y Encuadre"
          levels={[
            {score: 5, text: "Comunica el objetivo, explica actividades, activa conocimientos previos y relaciona el tema con otros contenidos o contextos."},
            {score: 4, text: "Comunica el objetivo de la sesión, explica las actividades y activa conocimientos previos mediante preguntas o actividades."},
            {score: 3, text: "Comunica el objetivo de la sesión y explica las activities a realizar."},
            {score: 2, text: "Menciona el tema o actividad de la sesión sin explicar objetivos o recuperación de conocimientos previos."},
            {score: 1, text: "No se observan acciones de introducción u organización académica al inicio de la sesión."}
          ]}
          naLabel="No fue posible observar el inicio de la sesión."
        />

        <CriterionTable 
          number="4.2" 
          title="Organización e Instrucciones de Trabajo"
          levels={[
            {score: 5, text: "Comunica la organización, explica qué actividades se realizarán, cómo se desarrollarán y los materiales/tiempos/formas de participación."},
            {score: 4, text: "Comunica la organización, explica qué actividades se realizarán y explica cómo se desarrollarán."},
            {score: 3, text: "Comunica qué actividades se realizarán durante la sesión."},
            {score: 2, text: "Proporciona instrucciones parciales o aisladas sin explicar la organización general."},
            {score: 1, text: "No se observan instrucciones u organización de la sesión."}
          ]}
          naLabel="No fue posible observar el inicio u organización de la sesión."
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center border-b pb-2">
          <LayoutDashboard className="w-5 h-5 mr-2 text-blue-600" /> Ejecución de la Sesión
        </h3>
        <CriterionTable 
          number="4.3" 
          title="Claridad en Criterios de la Actividad"
          levels={[
            {score: 5, text: "Comunica la actividad, tiempos de trabajo/entrega, producto esperado y criterios o instrumentos de evaluación."},
            {score: 4, text: "Comunica la actividad a realizar, tiempos de trabajo o entrega y producto esperado."},
            {score: 3, text: "Comunica la actividad a realizar y el producto esperado."},
            {score: 2, text: "Comunica únicamente la actividad a realizar durante la sesión."},
            {score: 1, text: "No se observan instrucciones relacionadas con actividades o productos de la sesión."}
          ]}
          naLabel="No fue posible observar explicación de actividades durante la sesión."
        />

        <CriterionTable 
          number="4.4" 
          title="Nivel Cognitivo de las Actividades"
          note="Evalúa actividades observables; no determina nivel de pensamiento crítico final."
          levels={[
            {score: 5, text: "Utiliza actividades que requieren análisis o resolución de problemas, explanation o argumentación y trabajo colaborativo."},
            {score: 4, text: "Utiliza actividades que requieren análisis o resolución de problemas y explicación o argumentación relacionada."},
            {score: 3, text: "Utiliza actividades que requieren explicación, análisis o resolución de problemas."},
            {score: 2, text: "Actividades centradas únicamente en repetición o seguimiento de instrucciones."},
            {score: 1, text: "No se observan actividades de análisis, explicación o resolución de problemas."}
          ]}
          naLabel="No fue posible observar actividades de aprendizaje durante la sesión."
        />

        <CriterionTable 
          number="4.5" 
          title="Uso de Recursos Didácticos y Digitales"
          levels={[
            {score: 5, text: "Utiliza recursos digitales, materiales didácticos y documentos o recursos audiovisuales relacionados con la sesión."},
            {score: 4, text: "Utiliza dos tipos distintos de recursos relacionados con la sesión."},
            {score: 3, text: "Utiliza al menos un recurso didáctico o digital relacionado con la sesión."},
            {score: 2, text: "Presenta recursos sin utilizarlos durante el desarrollo de la sesión."},
            {score: 1, text: "No se observan recursos didácticos o digitales durante la sesión."}
          ]}
          naLabel="La dinámica de la sesión no requirió recursos observables."
        />

        <CriterionTable 
          number="4.6" 
          title="Estrategias para la Participación"
          levels={[
            {score: 5, text: "Solicita participación individual, promueve interacción entre estudiantes y utiliza más de una dinámica de participación."},
            {score: 4, text: "Solicita participación individual y promueve interacción entre estudiantes."},
            {score: 3, text: "Solicita participación estudiantil relacionada con el contenido."},
            {score: 2, text: "Permite participación únicamente cuando los estudiantes intervienen espontáneamente."},
            {score: 1, text: "No se observan acciones para promover participación estudiantil."}
          ]}
          naLabel="La estructura de la sesión no contempló espacios de participación."
        />

        <CriterionTable 
          number="4.7" 
          title="Interrogación y Cuestionamiento"
          levels={[
            {score: 5, text: "Utiliza preguntas abiertas, de análisis o reflexión y dirigidas a distintos estudiantes."},
            {score: 4, text: "Utiliza preguntas abiertas y preguntas relacionadas con análisis o reflexión del contenido."},
            {score: 3, text: "Utiliza preguntas relacionadas con el contenido durante la sesión."},
            {score: 2, text: "Utiliza preguntas cerradas o de respuesta breve únicamente."},
            {score: 1, text: "No se observan preguntas relacionadas con el contenido."}
          ]}
          naLabel="La dinámica de la sesión no contempló interacción verbal observable."
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center border-b pb-2">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600" /> Habilidades de Comunicación
        </h3>
        <CriterionTable 
          number="4.8" 
          title="Comunicación No Verbal y Contacto Visual"
          levels={[
            {score: 5, text: "Mantiene contacto visual e interacción corporal observable durante toda la sesión."},
            {score: 4, text: "Mantiene contacto visual e interacción corporal durante la mayor parte de la sesión."},
            {score: 3, text: "Utiliza contacto visual o comunicación no verbal en momentos específicos de la sesión."},
            {score: 2, text: "El contacto visual y la comunicación no verbal son limitados durante la sesión."},
            {score: 1, text: "No se observan elementos de comunicación no verbal relacionados con la interacción."}
          ]}
          naLabel="No fue posible observar interacción directa con el grupo."
        />

        <CriterionTable 
          number="4.9" 
          title="Manejo de la Voz (Paralingüística)"
          levels={[
            {score: 5, text: "Utiliza cambios de volumen, entonación, velocidad y pausas durante la sesión de manera efectiva."},
            {score: 4, text: "Utiliza tres de los elementos (volumen, entonación, velocidad, pausas) durante la sesión."},
            {score: 3, text: "Utiliza dos de los elementos anteriores durante la sesión."},
            {score: 2, text: "Utiliza uno de los elementos anteriores durante la sesión."},
            {score: 1, text: "No se observan variaciones en la comunicación oral (monótono)."}
          ]}
          naLabel="No fue posible observar intervenciones orales suficientes."
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center border-b pb-2">
          <CheckSquare className="w-5 h-5 mr-2 text-blue-600" /> Cierre de la Sesión
        </h3>
        <CriterionTable 
          number="4.10" 
          title="Recuperación y Comentarios de Cierre"
          note="Evalúa acciones de cierre; no determina nivel de aprendizaje final."
          levels={[
            {score: 5, text: "Realiza cierre, solicita participación estudiantil sobre lo trabajado y relaciona información revisada."},
            {score: 4, text: "Realiza actividades de cierre y solicita participación estudiantil sobre lo trabajado."},
            {score: 3, text: "Realiza una actividad o comentario de cierre relacionado con la sesión."},
            {score: 2, text: "Finaliza la sesión sin recuperar información trabajada durante la clase."},
            {score: 1, text: "No se observan actividades o comentarios de cierre relacionados con la sesión."}
          ]}
          naLabel="No fue posible observar el cierre de la sesión."
        />

        <CriterionTable 
          number="4.11" 
          title="Síntesis de Contenidos y Objetivos"
          levels={[
            {score: 5, text: "Resume contenidos, relaciona actividades realizadas y retoma el objetivo de la sesión al finalizar."},
            {score: 4, text: "Resume contenidos trabajados y relaciona actividades realizadas durante la sesión."},
            {score: 3, text: "Resume contenidos o actividades realizadas durante la sesión."},
            {score: 2, text: "Realiza comentarios generales de cierre sin resumir contenidos o actividades."},
            {score: 1, text: "No se observan acciones de síntesis o cierre relacionadas con la sesión."}
          ]}
          naLabel="No fue posible observar el cierre de la sesión."
        />
      </div>
    </Accordion>
  </div>
);

const ContenidoIdiomas = () => (
  <div className="animate-fade-in">
    
    <VideoEmbed 
      title="Guía de Observación: Clases de Idiomas" 
      description="Descubre nuestra visión sobre la enseñanza de lenguas. Te explicamos de forma empática y objetiva cómo evaluamos la inmersión (Target Language), el fomento de la interacción y las estrategias comunicativas para reducir el filtro afectivo de tus alumnos."
      embedId="eDHtNsIa9wE"
      colorTheme="indigo"
    />

    <Accordion title="1. PREPARATION" icon={BookOpen} defaultOpen={false}>
      <CriterionTable 
        number="1.1" 
        title="The teacher uses both: structured language activities, and activities that require student interaction or language production during the session."
        levels={[
          {score: 5, text: "The teacher uses: structured language activities, student interaction activities, and activities requiring spoken or written language production during the session."},
          {score: 4, text: "The teacher uses: structured language activities, and activities requiring student interaction during the session."},
          {score: 3, text: "The teacher uses more than one type of language activity during the session."},
          {score: 2, text: "The teacher uses only one type of activity during most of the session."},
          {score: 1, text: "No observable language-learning activities are developed during the session."}
        ]}
        naLabel="It was not possible to observe language-learning activities during the session."
      />

      <CriterionTable 
        number="1.2" 
        title="The teacher introduces activities using: examples, situations, previous content, or explanations related to the topic of the lesson."
        levels={[
          {score: 5, text: "The teacher introduces activities using: examples, situations related to the topic, previous content, and explanations of the activity purpose."},
          {score: 4, text: "The teacher introduces activities using: examples, situations related to the topic, and explanations of the activity purpose."},
          {score: 3, text: "The teacher introduces activities using examples or explanations related to the lesson topic."},
          {score: 2, text: "The teacher introduces activities without relating them to the lesson topic or previous content."},
          {score: 1, text: "Activities are assigned without introduction or contextual explanation."}
        ]}
        naLabel="It was not possible to observe activity introduction during the session."
      />

      <CriterionTable 
        number="1.3" 
        title="The teacher uses activities that require students to use language related to: real situations, personal information, academic tasks, or everyday communication."
        note="This criterion evaluates observable language-use activities during the session and does not determine communicative competence or language acquisition outcomes."
        levels={[
          {score: 5, text: "The teacher uses activities requiring students to: exchange information, respond to situations, and use language related to real or academic contexts."},
          {score: 4, text: "The teacher uses activities requiring students to use language related to real or academic contexts."},
          {score: 3, text: "The teacher uses activities involving controlled language use related to the lesson topic."},
          {score: 2, text: "Activities focus mainly on isolated repetition or mechanical exercises."},
          {score: 1, text: "No activities involving language use are observed during the session."}
        ]}
        naLabel="It was not possible to observe student language-use activities during the session."
      />

      <CriterionTable 
        number="1.4" 
        title="The teacher uses activities or materials in addition to the coursebook during the session."
        levels={[
          {score: 5, text: "The teacher uses: coursebook activities, additional materials, and supplementary activities developed during the session."},
          {score: 4, text: "The teacher uses: coursebook activities, and additional materials or activities during the session."},
          {score: 3, text: "The teacher uses at least one activity or material apart from the coursebook."},
          {score: 2, text: "The teacher uses only coursebook activities during the session."},
          {score: 1, text: "No observable learning activities or materials are used during the session."}
        ]}
        naLabel="It was not possible to observe activities or materials during the session."
      />
    </Accordion>

    <Accordion title="2. LANGUAGE USE" icon={MessageSquare} defaultOpen={false}>
      <CriterionTable 
        number="2.1" 
        title="The teacher uses the target language during explanations, instructions, or classroom interaction."
        levels={[
          {score: 5, text: "The teacher uses the target language during: explanations, instructions, classroom interaction, and feedback throughout the session."},
          {score: 4, text: "The teacher uses the target language during: explanations, instructions, and classroom interaction during most of the session."},
          {score: 3, text: "The teacher uses the target language during some parts of the session."},
          {score: 2, text: "The teacher uses isolated words or brief expressions in the target language during the session."},
          {score: 1, text: "No observable use of the target language occurs during the session."}
        ]}
        naLabel="It was not possible to observe oral interaction during the session."
      />

      <CriterionTable 
        number="2.2" 
        title="The teacher communicates in the target language during the session."
        note="This criterion evaluates observable classroom language use during the session and does not certify linguistic proficiency, pronunciation accuracy, or grammatical mastery of the teacher."
        levels={[
          {score: 5, text: "The teacher: maintains communication in the target language throughout the session, responds to questions in the target language, and completes explanations without switching languages frequently."},
          {score: 4, text: "The teacher: maintains communication in the target language during most of the session, and responds to classroom interaction in the target language."},
          {score: 3, text: "The teacher uses the target language during explanations or interaction in some parts of the session."},
          {score: 2, text: "The teacher alternates constantly between languages or limits communication in the target language to isolated expressions."},
          {score: 1, text: "No observable communication in the target language occurs during the session."}
        ]}
        naLabel="It was not possible to observe oral communication during the session."
      />

      <CriterionTable 
        number="2.3" 
        title="The teacher creates opportunities for students to use the target language during classroom interaction."
        levels={[
          {score: 5, text: "The teacher: asks questions in the target language, requests student responses in the target language, and develops activities requiring interaction in the target language."},
          {score: 4, text: "The teacher: asks questions in the target language, and requests student responses in the target language."},
          {score: 3, text: "The teacher requests brief student participation in the target language during the session."},
          {score: 2, text: "The teacher allows optional use of the target language without directly requesting participation."},
          {score: 1, text: "No observable opportunities for student use of the target language occur during the session."}
        ]}
        naLabel="The session structure did not include observable student interaction."
      />
    </Accordion>

    <Accordion title="3. CLASS PRESENTATION" icon={PlayCircle} defaultOpen={false}>
      
      <CriterionTable 
        number="3.1" 
        title="The teacher presents: lesson objectives, activities, and content explanations during the session."
        levels={[
          {score: 5, text: "The teacher: presents lesson objectives, explains activities, develops content explanations, and connects activities with the lesson topic during the session."},
          {score: 4, text: "The teacher: presents lesson objectives, explains activities, and develops content explanations during the session."},
          {score: 3, text: "The teacher: explains activities or lesson content during the session."},
          {score: 2, text: "The teacher provides limited explanation of activities or lesson content."},
          {score: 1, text: "No observable explanation of lesson content or activities occurs during the session."}
        ]}
        naLabel="It was not possible to observe lesson development during the session."
      />

      <CriterionTable 
        number="3.2" 
        title="The activities used during the session are related to the lesson objectives or topic."
        levels={[
          {score: 5, text: "The activities: are related to the lesson topic, require use of lesson content, and correspond to the lesson objectives presented during the session."},
          {score: 4, text: "The activities: are related to the lesson topic, and correspond to the lesson objectives."},
          {score: 3, text: "The activities are related to the lesson topic during the session."},
          {score: 2, text: "The activities show limited relation to the lesson topic or objectives."},
          {score: 1, text: "No observable relation between activities and lesson content occurs during the session."}
        ]}
        naLabel="It was not possible to observe classroom activities during the session."
      />

      <CriterionTable 
        number="3.3" 
        title="The teacher distributes classroom time among activities during the session."
        levels={[
          {score: 5, text: "The teacher: assigns time to activities, completes planned activities, and maintains continuous lesson development during the session."},
          {score: 4, text: "The teacher: assigns time to activities, and completes most planned activities during the session."},
          {score: 3, text: "The teacher develops activities during the session without major interruptions or delays."},
          {score: 2, text: "Activity development is interrupted by repeated delays, transitions, or unfinished tasks."},
          {score: 1, text: "The session lacks observable time organization for activities."}
        ]}
        naLabel="It was not possible to observe activity development during the session."
      />

      <CriterionTable 
        number="3.4" 
        title="The session includes both: teacher verbal participation, and student verbal participation."
        note="This criterion evaluates observable verbal participation during the session and does not establish an ideal proportion of teacher or student talk."
        levels={[
          {score: 5, text: "The session includes: teacher explanations, student verbal participation, and interaction among students during the session."},
          {score: 4, text: "The session includes: teacher explanations, and student verbal participation during the session."},
          {score: 3, text: "The session includes limited student verbal participation during the session."},
          {score: 2, text: "The session is developed mainly through teacher verbal participation."},
          {score: 1, text: "No observable student verbal participation occurs during the session."}
        ]}
        naLabel="The session structure did not include observable verbal interaction."
      />

      <CriterionTable 
        number="3.5" 
        title="The teacher provides feedback related to student participation or classroom activities."
        levels={[
          {score: 5, text: "The teacher: corrects student responses, provides explanations, and gives feedback related to classroom activities during the session."},
          {score: 4, text: "The teacher: corrects student responses, and provides feedback related to classroom activities."},
          {score: 3, text: "The teacher provides comments or corrections related to student participation."},
          {score: 2, text: "The teacher provides general comments without correction or explanation."},
          {score: 1, text: "No observable feedback related to student participation occurs during the session."}
        ]}
        naLabel="The session structure did not include observable student participation."
      />

      <CriterionTable 
        number="3.6" 
        title="The teacher includes references to: cultural practices, social situations, traditions, or contextual uses of the target language during the session."
        levels={[
          {score: 5, text: "The teacher includes: cultural references, contextual language use, and discussion of social or cultural situations related to the lesson."},
          {score: 4, text: "The teacher includes: cultural references, and contextual language use related to the lesson."},
          {score: 3, text: "The teacher mentions cultural or contextual information related to the target language."},
          {score: 2, text: "The teacher makes isolated references unrelated to lesson development."},
          {score: 1, text: "No observable cultural references occur during the session."}
        ]}
        naLabel="The lesson content did not include observable cultural components."
      />

      <CriterionTable 
        number="3.7" 
        title="The teacher uses technological or digital resources during the session."
        levels={[
          {score: 5, text: "The teacher uses: audio, video, and digital or web-based materials related to the lesson activities."},
          {score: 4, text: "The teacher uses: two types of technological or digital resources during the session."},
          {score: 3, text: "The teacher uses at least one technological or digital resource during the session."},
          {score: 2, text: "Technological or digital resources are presented but not integrated into classroom activities."},
          {score: 1, text: "No observable use of technological or digital resources occurs during the session."}
        ]}
        naLabel="The session structure did not require technological or digital resources."
      />

    </Accordion>

    <Accordion title="4. CLASSROOM MANAGEMENT" icon={Users} defaultOpen={false}>
      
      <CriterionTable 
        number="4.1" 
        title="The teacher uses pair work or group work during classroom activities."
        levels={[
          {score: 5, text: "The teacher: organizes pair work, organizes group work, and provides instructions for collaborative activities during the session."},
          {score: 4, text: "The teacher: organizes pair work or group work, and provides instructions for collaborative activities."},
          {score: 3, text: "The teacher uses at least one collaborative activity during the session."},
          {score: 2, text: "Students work individually during most of the session with limited interaction."},
          {score: 1, text: "No observable collaborative activities occur during the session."}
        ]}
        naLabel="The lesson structure did not include collaborative activities."
      />

      <CriterionTable 
        number="4.2" 
        title="The classroom arrangement allows student interaction and movement during activities."
        levels={[
          {score: 5, text: "The classroom arrangement: allows student interaction, supports group or pair activities, and allows teacher movement during the session."},
          {score: 4, text: "The classroom arrangement: allows student interaction, and supports classroom activities during the session."},
          {score: 3, text: "The classroom arrangement allows limited student interaction during activities."},
          {score: 2, text: "The classroom arrangement restricts movement or interaction during activities."},
          {score: 1, text: "The classroom arrangement prevents observable interaction during the session."}
        ]}
        naLabel="It was not possible to observe classroom organization during the session."
      />

      <CriterionTable 
        number="4.3" 
        title="Students participate in activities related to the lesson during the session."
        note="This criterion evaluates observable participation during the session and does not determine student motivation or learning outcomes."
        levels={[
          {score: 5, text: "Most students: participate in classroom activities, follow activity instructions, and remain engaged in lesson tasks during the session."},
          {score: 4, text: "Most students: participate in classroom activities, and follow activity instructions during the session."},
          {score: 3, text: "Some students participate in classroom activities during the session."},
          {score: 2, text: "Student participation is limited or frequently interrupted during activities."},
          {score: 1, text: "No observable student participation related to lesson activities occurs during the session."}
        ]}
        naLabel="The session structure did not include observable student participation."
      />

      <CriterionTable 
        number="4.4" 
        title="The teacher maintains activity development during the session without extended interruptions."
        levels={[
          {score: 5, text: "The session: progresses continuously between activities, includes clear transitions, and avoids extended interruptions or inactive periods."},
          {score: 4, text: "The session progresses continuously with only brief interruptions between activities."},
          {score: 3, text: "The session includes occasional interruptions or inactive periods during activities."},
          {score: 2, text: "The session includes repeated interruptions or extended inactive periods."},
          {score: 1, text: "The session lacks observable continuity between activities."}
        ]}
        naLabel="It was not possible to observe activity transitions during the session."
      />

      <CriterionTable 
        number="4.5" 
        title="The teacher develops activities requiring students to produce spoken or written language."
        levels={[
          {score: 5, text: "The teacher develops activities requiring: spoken interaction, written production, and student responses related to the lesson content."},
          {score: 4, text: "The teacher develops activities requiring: spoken interaction, and student responses related to the lesson content."},
          {score: 3, text: "The teacher develops activities requiring brief spoken or written student responses."},
          {score: 2, text: "Activities focus mainly on repetition or teacher-centered participation."},
          {score: 1, text: "No observable student language production activities occur during the session."}
        ]}
        naLabel="The session structure did not include observable language production activities."
      />

      <CriterionTable 
        number="4.6" 
        title="The teacher checks student work or activity development during the session."
        levels={[
          {score: 5, text: "The teacher: moves around the classroom, checks student work during activities, and interacts with different students or groups during the session."},
          {score: 4, text: "The teacher: checks student work, and interacts with students during activities."},
          {score: 3, text: "The teacher checks student work during some parts of the session."},
          {score: 2, text: "The teacher observes activities without interacting with students during most of the session."},
          {score: 1, text: "No observable monitoring of student work occurs during the session."}
        ]}
        naLabel="The session structure did not include observable student work activities."
      />

      <CriterionTable 
        number="4.7" 
        title="The teacher uses questions related to lesson content during the session."
        levels={[
          {score: 5, text: "The teacher uses: open questions, follow-up questions, and questions directed to different students during the session."},
          {score: 4, text: "The teacher uses: open questions, and questions related to lesson understanding during the session."},
          {score: 3, text: "The teacher asks questions related to lesson content during the session."},
          {score: 2, text: "The teacher uses mainly closed or one-word-answer questions."},
          {score: 1, text: "No observable questions related to lesson content occur during the session."}
        ]}
        naLabel="The session structure did not include observable verbal interaction."
      />

      <CriterionTable 
        number="4.8" 
        title="The teacher responds to student language errors during classroom activities."
        levels={[
          {score: 5, text: "The teacher: identifies student errors, provides corrections, and explains or models corrected language during the session."},
          {score: 4, text: "The teacher: identifies student errors, and provides corrections during classroom activities."},
          {score: 3, text: "The teacher responds to some student errors during the session."},
          {score: 2, text: "The teacher observes student errors without observable correction during most activities."},
          {score: 1, text: "No observable response to student language errors occurs during the session."}
        ]}
        naLabel="The session structure did not include observable student language production."
      />
    </Accordion>

    <Accordion title="5. CLASSROOM ATMOSPHERE" icon={ThumbsUp} defaultOpen={false}>
      
      <CriterionTable 
        number="5.1" 
        title="The teacher promotes student participation during classroom activities."
        levels={[
          {score: 5, text: "The teacher: requests participation from different students, develops interaction activities, and maintains student participation during most of the session."},
          {score: 4, text: "The teacher: requests participation from different students, and develops interaction activities during the session."},
          {score: 3, text: "The teacher requests student participation during some parts of the session."},
          {score: 2, text: "Student participation occurs only occasionally or through voluntary responses."},
          {score: 1, text: "No observable actions promoting student participation occur during the session."}
        ]}
        naLabel="The lesson structure did not include observable student participation."
      />

      <CriterionTable 
        number="5.2" 
        title="The classroom interaction allows student participation and respectful communication during the session."
        note="This criterion evaluates observable classroom interaction during the session and does not determine students’ emotional state or personal perceptions of the classroom environment."
        levels={[
          {score: 5, text: "During the session: students participate without repeated interruption, classroom interaction remains respectful, and the teacher allows student responses and questions during activities."},
          {score: 4, text: "During the session: classroom interaction remains respectful, and students participate during activities."},
          {score: 3, text: "Students participate during some parts of the session without observable conflict or interruption."},
          {score: 2, text: "Student participation is limited by interruptions, lack of interaction, or restricted opportunities to respond."},
          {score: 1, text: "Observable classroom interaction prevents participation or respectful communication during the session."}
        ]}
        naLabel="It was not possible to observe classroom interaction during the session."
      />

      <CriterionTable 
        number="5.3" 
        title="The teacher responds to student questions, errors, or requests for clarification during the session."
        levels={[
          {score: 5, text: "The teacher: responds to student questions, provides clarification, and adjusts explanations or activities during the session when needed."},
          {score: 4, text: "The teacher: responds to student questions, and provides clarification during activities."},
          {score: 3, text: "The teacher responds to some student questions or requests for clarification during the session."},
          {score: 2, text: "Student questions or requests receive limited response during the session."},
          {score: 1, text: "No observable response to student questions or requests for clarification occurs during the session."}
        ]}
        naLabel="The session did not include observable student questions or requests for clarification."
      />

      <CriterionTable 
        number="5.4" 
        title="The teacher responds to student errors during classroom activities."
        levels={[
          {score: 5, text: "The teacher: identifies student errors, provides correction, explains corrected language, and allows students to continue participation after correction."},
          {score: 4, text: "The teacher: identifies student errors, provides correction, and allows continued student participation during activities."},
          {score: 3, text: "The teacher provides correction related to student errors during the session."},
          {score: 2, text: "The teacher provides correction without additional explanation or follow-up participation."},
          {score: 1, text: "No observable response to student errors occurs during the session."}
        ]}
        naLabel="The session structure did not include observable student language production."
      />

    </Accordion>

    <Accordion title="6. CLOSING" icon={CheckSquare} defaultOpen={false}>
      
      <CriterionTable 
        number="6.1" 
        title="The teacher reviews or summarizes lesson content at the end of the session."
        levels={[
          {score: 5, text: "The teacher: reviews lesson content, summarizes activities completed during the session, and retakes the lesson objective at the end of the class."},
          {score: 4, text: "The teacher: reviews lesson content, and summarizes activities completed during the session."},
          {score: 3, text: "The teacher reviews lesson content or activities at the end of the session."},
          {score: 2, text: "The teacher makes general closing comments without reviewing lesson content or activities."},
          {score: 1, text: "No observable lesson summary or closing review occurs during the session."}
        ]}
        naLabel="It was not possible to observe the end of the session."
      />

      <CriterionTable 
        number="6.2" 
        title="The teacher provides opportunities for students to respond, participate, or use lesson content at the end of the session."
        note="This criterion evaluates observable student participation during the session closing and does not determine the level of learning achieved by students."
        levels={[
          {score: 5, text: "The teacher: requests student responses related to lesson content, allows students to participate at the end of the session, and develops an activity or interaction reviewing lesson content."},
          {score: 4, text: "The teacher: requests student responses related to lesson content, and allows participation during the session closing."},
          {score: 3, text: "The teacher requests brief student responses related to the lesson at the end of the session."},
          {score: 2, text: "Students participate minimally or only through isolated responses during the session closing."},
          {score: 1, text: "No observable student participation related to lesson content occurs during the session closing."}
        ]}
        naLabel="It was not possible to observe the end of the session."
      />

    </Accordion>

  </div>
);

// --- COMPONENTE ENVOLTORIO DE RÚBRICAS CON PESTAÑAS ---
const Rubricas = () => {
  const [tipoRubrica, setTipoRubrica] = useState('contenido');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl relative pb-20">
      <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-200 pb-4 print:border-none print:pb-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Rúbricas de Evaluación</h2>
          <p className="text-slate-600 no-print">Seleccione el tipo de rúbrica a consultar.</p>
        </div>
      </div>

      <LineamientosGenerales />
      <EscalaObjetiva />

      <div className="flex space-x-2 border-b border-slate-200 mb-6 no-print">
        <button
          onClick={() => setTipoRubrica('contenido')}
          className={`px-5 py-3 font-semibold text-sm rounded-t-lg transition-colors ${
            tipoRubrica === 'contenido' 
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Materias de Contenido
        </button>
        <button
          onClick={() => setTipoRubrica('idiomas')}
          className={`px-5 py-3 font-semibold text-sm rounded-t-lg transition-colors ${
            tipoRubrica === 'idiomas' 
              ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Clases de Idiomas
        </button>
      </div>

      <div className="print:block">
        {tipoRubrica === 'contenido' ? <ContenidoAula /> : <ContenidoIdiomas />}
      </div>

      {/* BOTÓN DE DESCARGA REUBICADO AL FINAL */}
      <div className="mt-12 pt-8 border-t border-slate-200 flex justify-center no-print">
        <button 
          onClick={handlePrint}
          className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg font-bold text-white transform hover:-translate-y-1 ${
            tipoRubrica === 'contenido' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-indigo-700 hover:bg-indigo-800'
          }`}
        >
          <Download className="w-5 h-5" />
          <span>
            {tipoRubrica === 'contenido' 
              ? 'Descargar Rúbrica de Materias de Contenido' 
              : 'Descargar Rúbrica de Idiomas'}
          </span>
        </button>
      </div>
    </div>
  );
};


// --- APP PRINCIPAL ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Inicializar la pestaña activa basándose en el hash de la URL o por defecto en 'introduccion'
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['introduccion', 'inicio', 'calendario', 'rubricas', 'marco', 'faq'];
    return validTabs.includes(hash) ? hash : 'introduccion';
  });

  // Logo con ruta directa de Google (lh3.googleusercontent.com)
  const logoUrl = "https://lh3.googleusercontent.com/d/1LMA_nxa5iMa-7FOZ2w3TbW4Bc-CTs08p";

  // Efecto de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para escuchar el botón "Atrás" del navegador
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['introduccion', 'inicio', 'calendario', 'rubricas', 'marco', 'faq'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('introduccion');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Función unificada para cambiar de pestaña y agregar historial
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.history.pushState(null, '', `#${tabId}`);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'introduccion', label: 'Introducción', icon: Info },
    { id: 'inicio', label: 'Modelo de Evaluación', icon: LayoutDashboard },
    { id: 'calendario', label: 'Calendario y Fases', icon: CalendarDays },
    { id: 'rubricas', label: 'Rúbricas de Evaluación', icon: CheckSquare },
    { id: 'marco', label: 'Marco Teórico', icon: BookOpen },
    { id: 'faq', label: 'FAQ y Contacto', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'introduccion': return <Introduccion setActiveTab={handleTabChange} />;
      case 'inicio': return <Dashboard />;
      case 'marco': return <MarcoTeorico />;
      case 'rubricas': return <Rubricas />;
      case 'faq': return <FaqContacto />;
      case 'calendario': return <Calendario />;
      default: return <Introduccion setActiveTab={handleTabChange} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4">
        <div className="relative flex justify-center items-center w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-t-blue-700 border-r-blue-700 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-t-transparent border-r-transparent border-b-red-600 border-l-red-600 rounded-full animate-spin-reverse"></div>
          <PieChart className="w-8 h-8 text-blue-800" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-wide">Universidad Tecnológica El Retoño</h1>
        <p className="text-slate-500 mt-2 animate-pulse font-medium">Cargando Plataforma de Evaluación 360°...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      
      {/* Navbar Móvil */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm z-20 no-print">
        <div className="flex items-center space-x-3">
          <img 
            src={logoUrl} 
            alt="Logo UT El Retoño" 
            className="w-10 h-10 object-contain"
            onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
          />
          <GraduationCap className="w-8 h-8 text-blue-800 hidden" />
          <span className="font-bold text-lg text-slate-800">UT El Retoño</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-800">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar de Navegación */}
      <aside className={`
        no-print
        fixed md:static inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out z-30
        w-72 bg-white border-r border-slate-200 shadow-xl md:shadow-none h-full flex flex-col
      `}>
        {/* Header del Sidebar */}
        <div className="p-6 hidden md:flex items-center space-x-4 border-b border-slate-100 bg-white">
          <img 
            src={logoUrl} 
            alt="Logo UT El Retoño" 
            className="w-14 h-14 object-contain"
            onError={(e) => { 
              e.target.style.display = 'none'; 
              e.target.nextSibling.style.display = 'flex'; 
            }}
          />
          {/* Fallback */}
          <div className="hidden w-12 h-12 bg-blue-800 rounded-lg items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-lg text-slate-800 leading-tight">Evaluación 360°</span>
            <span className="text-red-600 text-[10px] font-bold tracking-wider leading-tight mt-1">UNIVERSIDAD TECNOLÓGICA<br/>EL RETOÑO</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-semibold
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
        
        {/* Footer con Autoría */}
        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <div className="bg-white p-4 rounded-xl text-xs text-slate-500 text-center shadow-sm border border-slate-200">
            <p className="font-bold text-slate-700 mb-1">Diseñado por:</p>
            <p className="text-slate-800 font-medium">Luis Ángel Márquez Gallardo</p>
            <p className="mt-1 italic">Coordinador de Evaluación Docente</p>
            <p className="mt-3 border-t border-slate-100 pt-2">© {new Date().getFullYear()} UTR BIS</p>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative bg-slate-50/50 print:p-0 print:bg-white">
        <div className="max-w-5xl mx-auto">
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
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          /* Asegurar que las tablas no se corten abruptamente si es posible */
          table { page-break-inside: avoid; }
        }
      `}} />
    </div>
  );
}