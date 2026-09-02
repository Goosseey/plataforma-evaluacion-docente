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

const RatingScaleLanguages = () => (
  <div className="bg-white rounded-lg p-5 border border-indigo-100 text-sm mb-6 shadow-sm print:shadow-none print:border-slate-300">
    <h4 className="font-bold text-slate-800 mb-3 tracking-wider">RATING SCALE</h4>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-700 font-bold rounded mr-2">5</span> Outstanding</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-lime-100 text-lime-600 font-bold rounded mr-2">4</span> Distinguished</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-yellow-100 text-yellow-600 font-bold rounded mr-2">3</span> Satisfactory</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-red-100 text-red-600 font-bold rounded mr-2">2</span> Acceptable</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-rose-100 text-rose-900 font-bold rounded mr-2">1</span> Non-compliance</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded mr-2">0</span> Not Applicable / Not Observable</div>
    </div>
    <p className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
      The level names correspond to the institutional rating scale. Scores must be assigned according to the specific descriptor established for each criterion.
    </p>
  </div>
);

const GuidelinesLanguages = () => (
  <Accordion title="Purpose and Guidelines for Use of the Instrument" icon={Info} defaultOpen={false}>
    <div className="space-y-7 text-sm text-slate-700 p-2">
      <div>
        <h4 className="font-bold text-indigo-800 text-base mb-2">Purpose</h4>
        <p className="text-justify">
          This rubric is intended to assess observable behaviors, actions, and interactions during a class session. The assessment is based exclusively on evidence recorded during the observation period and does not constitute a comprehensive evaluation of the teacher&apos;s professional performance.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-indigo-800 text-base mb-3 border-b pb-2">Guidelines for Use</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Scores must be based solely on observable evidence and the descriptors established for each criterion.</li>
          <li>The observer must not infer intentions, emotions, motivation, learning achieved, overall disciplinary knowledge, or overall linguistic competence.</li>
          <li>The quantity or frequency of a behavior does not, by itself, determine a higher performance level unless the criterion explicitly establishes otherwise.</li>
          <li>A single piece of evidence may support a performance level when it fully meets the corresponding descriptor.</li>
          <li>The assessment must consider the characteristics and conditions of the observed session without assuming a single required teaching structure or methodology.</li>
        </ul>
      </div>

      <div className="bg-slate-800 text-white rounded-xl p-6 shadow-sm">
        <h4 className="font-bold text-lg mb-3 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
          Not Applicable / Not Observable
        </h4>
        <div className="space-y-3 text-slate-200">
          <p>
            A score of <strong className="text-white">0 / N/A</strong> must be used when, due to the nature of the subject, activity, or observation conditions, there is no reasonable opportunity to assess the criterion.
          </p>
          <p>
            It must not be used when the criterion could reasonably have been observed but the behavior described did not occur. In that case, the corresponding performance level must be assigned.
          </p>
          <p className="font-semibold text-white">A score of 0 / N/A does not represent a performance rating.</p>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-indigo-800 text-base mb-2">Scope</h4>
        <p className="text-justify">
          The results apply exclusively to the observed session and cannot conclusively determine student learning, overall disciplinary or linguistic competence, or the overall effectiveness of the teacher&apos;s practice.
        </p>
      </div>
    </div>
  </Accordion>
);


// --- LINEAMIENTOS ACTUALIZADOS: RÚBRICA DE CONTENIDO ---
const LineamientosContenido = () => (
  <Accordion title="Propósito y Lineamientos de Aplicación del Instrumento" icon={Info} defaultOpen={false}>
    <div className="space-y-7 text-sm text-slate-700 p-2">
      <div>
        <h4 className="font-bold text-blue-800 text-base mb-2">Propósito</h4>
        <p className="text-justify">
          La presente rúbrica tiene como finalidad valorar conductas, acciones e interacciones observables durante una sesión de clase. La valoración se basa exclusivamente en evidencia registrada durante el periodo de observación y no constituye una evaluación integral del desempeño profesional del docente.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-blue-800 text-base mb-3 border-b pb-2">Principios de aplicación</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>La puntuación deberá sustentarse únicamente en evidencia observable y en los descriptores establecidos para cada criterio.</li>
          <li>No deberán inferirse intenciones, emociones, motivación, aprendizaje alcanzado, dominio disciplinar total ni competencia lingüística global.</li>
          <li>La cantidad o frecuencia de una conducta no determinará por sí sola un nivel superior, salvo cuando el criterio lo establezca expresamente.</li>
          <li>Una sola evidencia podrá sustentar un nivel cuando cumpla completamente con el descriptor correspondiente.</li>
          <li>La valoración deberá considerar las características y condiciones de la sesión observada, sin asumir una estructura o metodología única de enseñanza.</li>
        </ul>
      </div>

      <div className="bg-slate-800 text-white rounded-xl p-6 shadow-sm">
        <h4 className="font-bold text-lg mb-3 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
          No aplica / No observable
        </h4>
        <div className="space-y-3 text-slate-200">
          <p>
            El valor <strong className="text-white">0 / NA</strong> se utilizará cuando, por la naturaleza de la asignatura, la actividad o las condiciones de observación, no exista una oportunidad razonable para valorar el criterio.
          </p>
          <p>
            No deberá utilizarse cuando el criterio sí podía observarse, pero la conducta descrita no ocurrió. En ese caso deberá asignarse el nivel correspondiente.
          </p>
          <p className="font-semibold text-white">El 0 / NA no representa una calificación de desempeño.</p>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-blue-800 text-base mb-2">Alcances</h4>
        <p className="text-justify">
          Los resultados corresponden exclusivamente a la sesión observada y no permiten determinar de manera concluyente el aprendizaje alcanzado, el dominio disciplinar o lingüístico total ni la efectividad global de la práctica docente.
        </p>
      </div>
    </div>
  </Accordion>
);

const EscalaObjetivaContenido = () => (
  <div className="bg-white rounded-lg p-5 border border-blue-100 text-sm mb-6 shadow-sm print:shadow-none print:border-slate-300">
    <h4 className="font-bold text-slate-800 mb-3 tracking-wider">ESCALA DE EVALUACIÓN</h4>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-700 font-bold rounded mr-2">5</span> Sobresaliente</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-lime-100 text-lime-600 font-bold rounded mr-2">4</span> Destacado</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-yellow-100 text-yellow-600 font-bold rounded mr-2">3</span> Satisfactorio</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-red-100 text-red-600 font-bold rounded mr-2">2</span> Aceptable</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-rose-100 text-rose-900 font-bold rounded mr-2">1</span> Incumplimiento</div>
      <div className="flex items-center"><span className="w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded mr-2">0</span> No aplica / No observable</div>
    </div>
    <p className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
      Los nombres de los niveles corresponden a la escala institucional. La puntuación deberá asignarse conforme al descriptor específico de cada criterio.
    </p>
  </div>
);

// --- VISTAS PRINCIPALES ---

const Introduccion = ({ setActiveTab }) => {
  // Datos para la tabla de navegación dinámica
  const navItems = [
    { 
      id: 'inicio', 
      title: 'Modelo de Evaluación', 
      desc: 'Conoce los componentes que integran tu calificación final dentro del Modelo de Evaluación 360°.', 
      icon: LayoutDashboard, 
      bg: 'bg-blue-100', text: 'text-blue-700', hoverText: 'group-hover:text-blue-700' 
    },
    { 
      id: 'calendario', 
      title: 'Calendario y Fases', 
      desc: 'Consulta las etapas y periodos establecidos para los diferentes componentes del proceso de evaluación docente.', 
      icon: CalendarDays, 
      bg: 'bg-indigo-100', text: 'text-indigo-700', hoverText: 'group-hover:text-indigo-700' 
    },
    {
      id: 'guias',
      title: 'Guías de Observación',
      desc: 'Consulta materiales de orientación y preguntas de reflexión antes de una observación de clase.',
      icon: FileText,
      bg: 'bg-cyan-100', text: 'text-cyan-700', hoverText: 'group-hover:text-cyan-700'
    },
    { 
      id: 'rubricas', 
      title: 'Rúbricas de Evaluación', 
      desc: 'Consulta los instrumentos y descriptores utilizados en los distintos componentes del proceso de evaluación docente.', 
      icon: CheckSquare, 
      bg: 'bg-emerald-100', text: 'text-emerald-700', hoverText: 'group-hover:text-emerald-700' 
    },
    { 
      id: 'marco', 
      title: 'Marco Teórico', 
      desc: 'Conoce los fundamentos que sustentan el diseño, aplicación e interpretación de los instrumentos de observación.', 
      icon: BookOpen, 
      bg: 'bg-violet-100', text: 'text-violet-700', hoverText: 'group-hover:text-violet-700' 
    },
    { 
      id: 'faq', 
      title: 'FAQ y Contacto', 
      desc: 'Consulta respuestas a dudas frecuentes sobre la observación y comunícate directamente con la Coordinación de Evaluación Docente.', 
      icon: HelpCircle, 
      bg: 'bg-orange-100', text: 'text-orange-700', hoverText: 'group-hover:text-orange-700' 
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a la Plataforma de Evaluación Docente</h1>
        <p className="text-blue-100 text-lg leading-relaxed">
          Este espacio reúne la información, instrumentos y criterios utilizados en el proceso institucional de evaluación docente. Nuestro propósito es ofrecerte información clara sobre cómo se realiza la evaluación, qué aspectos se consideran durante la observación de clase y cómo se integran los distintos componentes del proceso.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Evaluación basada en evidencia" icon={ClipboardList} borderColor="border-blue-500">
          <p>La observación de clase se realiza a partir de evidencia observable registrada durante una sesión y de los descriptores establecidos en las rúbricas. Los instrumentos no establecen una única forma de impartir clase. La valoración considera las características de la asignatura, las actividades desarrolladas y las condiciones particulares de la sesión observada.</p>
        </Card>
        <Card title="Transparencia del proceso" icon={Search} borderColor="border-green-500">
          <p>En esta plataforma puedes consultar los mismos instrumentos, criterios y lineamientos utilizados durante el proceso de observación. Conocerlos te permite identificar qué se observa, cómo se asignan los niveles de desempeño y cuáles son los alcances y límites de la evaluación.</p>
        </Card>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-10">
        <div className="bg-slate-50 border-b border-slate-200 p-6 md:px-8 flex items-center">
          <Menu className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-slate-800">¿Cómo navegar por la plataforma?</h3>
            <p className="text-slate-500 text-sm mt-1">Selecciona cualquiera de las siguientes secciones para consultar la información correspondiente.</p>
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
        <div className="text-blue-100 text-lg max-w-3xl leading-relaxed space-y-3">
          <p>
            El Modelo de Evaluación 360° integra distintas fuentes de información sobre el desempeño docente a lo largo del cuatrimestre. Cada componente aporta una perspectiva diferente y, en conjunto, permite obtener una valoración más amplia del desempeño profesional.
          </p>
          <p>
            Ningún componente, considerado de manera aislada, representa por sí solo la totalidad de la práctica docente.
          </p>
        </div>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Composición de tu Calificación Final</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Estudiantes (30%)" icon={Users} borderColor="border-blue-600">
          <p>Evaluación realizada por los estudiantes mediante el instrumento institucional correspondiente, a partir de su experiencia como participantes del proceso de enseñanza y aprendizaje.</p>
        </Card>
        <Card title="Observación en Aula (30%)" icon={Search} borderColor="border-red-600">
          <div className="space-y-2">
            <p>Valoración de prácticas docentes observables durante una sesión de clase, mediante rúbricas con criterios y descriptores previamente establecidos.</p>
            <p>La observación corresponde exclusivamente a la sesión observada y constituye una de las fuentes de información del proceso integral de evaluación docente.</p>
          </div>
        </Card>
        <Card title="Jefe de Departamento (15%)" icon={ClipboardList} borderColor="border-blue-600">
          <p>Valoración realizada por el Jefe de Departamento mediante el instrumento institucional correspondiente, desde las responsabilidades y ámbitos de seguimiento propios de su función.</p>
        </Card>
        <Card title="Pares Académicos (15%)" icon={UserCheck} borderColor="border-slate-600">
          <p>Valoración realizada por colegas académicos mediante el instrumento institucional correspondiente, incorporando la perspectiva de otros docentes sobre los aspectos contemplados en este componente.</p>
        </Card>
        <Card title="Autoevaluación (10%)" icon={BookOpen} borderColor="border-red-600">
          <p>Valoración reflexiva del propio docente sobre su práctica y desempeño a partir de los criterios establecidos en el instrumento de autoevaluación.</p>
        </Card>
      </div>
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm flex items-start">
        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <p><strong>Importante:</strong> Para integrar el resultado final de la evaluación docente, se deberá contar con resultado en los cinco componentes del Modelo de Evaluación 360°.</p>
      </div>
    </div>
  </div>
);


const MarcoTeorico = () => (
  <div className="space-y-6 animate-fade-in max-w-4xl">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Fundamentos de la Observación y Evaluación de Clase</h2>
      <p className="text-slate-600 text-justify mb-3">
        La observación de clase constituye una fuente directa de información sobre prácticas docentes que ocurren durante una sesión específica. Su propósito es documentar evidencia observable que permita describir determinados aspectos de la práctica mediante criterios previamente establecidos.
      </p>
      <p className="text-slate-600 text-justify">
        La enseñanza es una actividad compleja y situada. Una sesión de clase permite observar acciones, interacciones, explicaciones, actividades y respuestas concretas, pero no permite determinar por sí sola la calidad global del desempeño profesional de un docente, el aprendizaje alcanzado por los estudiantes ni todos los procesos que forman parte de la enseñanza. Por esta razón, la observación debe interpretarse dentro de los límites de la evidencia disponible y como parte de un proceso de evaluación más amplio.
      </p>
    </div>

    <Accordion title="1. La observación como evidencia situada de la práctica docente" icon={Search} defaultOpen={false}>
      <div className="space-y-3 text-slate-700">
        <p className="text-justify">
          La observación de clase permite registrar la enseñanza mientras esta ocurre. Sin embargo, la interpretación de lo observado debe considerar que las decisiones docentes varían según la asignatura, el contenido, el nivel del grupo, las características de las actividades y las condiciones particulares de cada sesión.
        </p>
        <p className="text-justify">
          Darling-Hammond y Snyder señalan que la evaluación de la enseñanza debe reconocer esta dependencia del contexto y evitar reducir la práctica docente a una lista universal de conductas que deberían presentarse de la misma manera en todas las situaciones. O'Leary, por su parte, plantea la observación como una herramienta que puede utilizarse tanto para evaluación como para aprendizaje profesional, siempre que sus propósitos, criterios y límites estén claramente definidos.
        </p>
        <p className="text-justify">
          En consecuencia, las rúbricas de observación no establecen una estructura única de clase ni exigen la presencia sistemática de determinadas metodologías, recursos, formas de agrupamiento, tipos de preguntas, momentos de apertura o cierre u otras prácticas cuya pertinencia depende del contexto.
        </p>
        <p className="text-justify">
          La valoración se concentra en aquello que razonablemente puede observarse durante la sesión y en la forma en que la evidencia corresponde a los descriptores del instrumento.
        </p>
      </div>
    </Accordion>

    <Accordion title="2. Validez, consistencia y uso de rúbricas analíticas" icon={CheckSquare}>
      <div className="space-y-3 text-slate-700">
        <p className="text-justify">
          Todo instrumento de evaluación requiere que las interpretaciones derivadas de sus resultados sean consistentes con la evidencia que realmente recoge. Los <em>Standards for Educational and Psychological Testing</em>, desarrollados conjuntamente por AERA, APA y NCME, sitúan la validez, la confiabilidad y la equidad como principios centrales para el desarrollo, aplicación e interpretación de instrumentos de evaluación.
        </p>
        <p className="text-justify">
          En una observación de clase, esto implica evitar que la puntuación dependa de aspectos que el criterio no pretende evaluar, de inferencias sobre procesos que no pueden observarse directamente o de oportunidades que no se presentaron durante la sesión.
        </p>
        <p className="text-justify">
          La investigación sobre rúbricas muestra que estas pueden favorecer una mayor consistencia de las valoraciones cuando utilizan criterios explícitos y descriptores diferenciados de desempeño. Jonsson y Svingby encontraron que las rúbricas analíticas pueden contribuir a una mayor confiabilidad de la puntuación, especialmente cuando los criterios son específicos y su aplicación se acompaña de procesos de formación o calibración de los evaluadores. Al mismo tiempo, advierten que la existencia de una rúbrica no garantiza por sí misma una evaluación válida: la calidad depende de aquello que se decide evaluar y de cómo se interpretan los resultados.
        </p>
        <p className="text-justify">
          Brookhart señala igualmente que una rúbrica requiere criterios definidos y descripciones que permitan distinguir niveles de desempeño a lo largo de un continuo de calidad.
        </p>
        <p className="text-justify">
          A partir de estos principios, los instrumentos utilizan descriptores específicos para cada nivel y priorizan la correspondencia entre la evidencia observada y el descriptor. La frecuencia o cantidad de una conducta no constituye por sí sola evidencia de un nivel superior, excepto cuando la cantidad forma parte explícita del criterio evaluado.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-sm text-blue-900">
            Asimismo, el valor <strong>No aplica / No observable</strong> se reserva para situaciones en las que no existió una oportunidad razonable de valorar el criterio. La ausencia de una conducta cuando sí existió oportunidad de observarla debe valorarse mediante el descriptor correspondiente y no mediante N/A.
          </p>
        </div>
      </div>
    </Accordion>

    <Accordion title="3. Evaluar la práctica sin imponer una metodología única" icon={Layers}>
      <div className="space-y-3 text-slate-700">
        <p className="text-justify">
          Una observación contextualizada reconoce que diferentes estrategias pueden ser pertinentes para diferentes propósitos, contenidos y grupos. La calidad de la práctica no puede reducirse a la presencia acumulativa de determinadas técnicas.
        </p>
        <p className="text-justify">
          Darling-Hammond y Snyder advierten precisamente sobre las limitaciones de los sistemas de observación construidos a partir de listas de comportamientos supuestamente efectivos en cualquier contexto. La práctica docente requiere tomar decisiones diferentes ante distintas situaciones de enseñanza y aprendizaje.
        </p>
        <p className="text-justify">
          Por esta razón, los instrumentos no consideran que una clase sea superior simplemente por utilizar más recursos, más actividades, tecnología, trabajo colaborativo, preguntas abiertas, determinadas distribuciones del tiempo u otras características metodológicas.
        </p>
        <p className="text-justify">
          La valoración se realiza sobre aspectos definidos y observables de la práctica, atendiendo a lo que sucede dentro de las condiciones reales de la sesión.
        </p>
        <div className="bg-slate-50 border-l-4 border-slate-500 p-4 rounded-r-lg">
          <p className="text-sm text-slate-800">
            Este principio permite distinguir entre <strong>observar una práctica</strong> y <strong>prescribir una forma única de enseñar</strong>.
          </p>
        </div>
      </div>
    </Accordion>

    <Accordion title="4. Coherencia entre contenido, actividades y expectativas" icon={Target}>
      <div className="space-y-3 text-slate-700">
        <p className="text-justify">
          El concepto de alineamiento constructivo propuesto por Biggs continúa siendo pertinente como referencia para comprender la importancia de la coherencia entre aquello que se pretende desarrollar, las actividades mediante las que los estudiantes trabajan con el contenido y las evidencias utilizadas para valorar su desempeño. El modelo fue desarrollado específicamente en el contexto de educación superior.
        </p>
        <p className="text-justify">
          En estos instrumentos, este principio no implica que cada sesión deba comunicar formalmente un objetivo, seguir una secuencia determinada o utilizar una metodología específica. Se refleja, en cambio, en elementos observables como la relación de las actividades con el contenido trabajado, la comunicación de aquello que se espera realizar o producir y la existencia de criterios o condiciones que permitan comprender las expectativas de una actividad.
        </p>
        <p className="text-justify">
          La explicitación de criterios y expectativas también es consistente con la literatura sobre uso de rúbricas, que destaca su utilidad para hacer visibles los referentes mediante los cuales se valora una tarea o desempeño.
        </p>
      </div>
    </Accordion>

    <Accordion title="5. Obtención de evidencia, retroalimentación y respuesta docente" icon={MessageSquare}>
      <div className="space-y-3 text-slate-700">
        <p className="text-justify">
          La evaluación formativa se sustenta en obtener información sobre lo que los estudiantes están haciendo, comprendiendo o produciendo y utilizar esa información para orientar decisiones posteriores durante el proceso de enseñanza.
        </p>
        <p className="text-justify">
          Black y Wiliam identifican la obtención y utilización de evidencia del aprendizaje como un componente fundamental de la evaluación formativa. La información adquiere valor cuando permite ajustar las acciones de enseñanza y aprendizaje en función de lo que ocurre durante el proceso.
        </p>
        <p className="text-justify">
          De manera complementaria, Hattie y Timperley señalan que el efecto de la retroalimentación depende de su contenido y de la información que proporciona, y no simplemente de que exista un comentario del docente.
        </p>
        <p className="font-semibold text-slate-800">Estos principios se reflejan en criterios relacionados con:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>la obtención de información a partir del trabajo, respuestas, procedimientos o producciones de los estudiantes;</li>
          <li>la utilización de esa información para aclarar, orientar, corregir o retroalimentar;</li>
          <li>el seguimiento posterior a una intervención;</li>
          <li>la retroalimentación sobre producciones concretas;</li>
          <li>y la respuesta ante preguntas o dificultades identificables.</li>
        </ul>
        <p className="text-justify">
          La rúbrica no presupone que en toda sesión deban producirse errores, preguntas o dificultades. Cuando una situación necesaria para valorar un criterio no ocurre razonablemente durante la observación, su ausencia no debe convertirse automáticamente en una penalización.
        </p>
      </div>
    </Accordion>

    <Accordion title="6. Diferenciación entre materias de contenido y enseñanza de idiomas" icon={Globe}>
      <div className="space-y-6 text-slate-700">
        <div className="space-y-3">
          <p className="text-justify">
            La naturaleza de aquello que se enseña modifica las oportunidades de observación. Por esta razón se utilizan instrumentos diferenciados para materias de contenido y para clases de idiomas.
          </p>
          <p className="text-justify">
            La diferenciación no implica establecer una metodología única para cada tipo de clase. Su función es seleccionar aspectos observables que resulten pertinentes para el objeto de enseñanza.
          </p>
        </div>

        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-5">
          <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center"><BookOpen className="w-5 h-5 mr-2" />6.1 Materias de contenido</h4>
          <div className="space-y-3">
            <p className="text-justify">
              En las materias de contenido, la observación considera principalmente cómo se desarrolla el contenido disciplinar durante la sesión.
            </p>
            <p className="text-justify">
              El instrumento distingue entre presentar información y desarrollar explicaciones que permitan establecer relaciones entre conceptos, componentes, procedimientos o criterios. También considera el uso de ejemplos y aplicaciones, la vinculación con situaciones del ámbito profesional cuando esta resulte pertinente y las acciones mediante las cuales el docente obtiene información sobre el trabajo de los estudiantes y responde a ella.
            </p>
            <p className="text-justify">
              El alineamiento constructivo de Biggs ofrece una referencia para comprender la importancia de conectar contenido, actividades y evidencias dentro de la enseñanza universitaria, sin establecer que exista una única estrategia para lograrlo.
            </p>
            <p className="text-justify">
              Los criterios relativos a la estructura institucional de Google Classroom y a la incorporación progresiva de vocabulario técnico en inglés responden, además, a <strong>lineamientos institucionales específicos</strong>. Su inclusión en la rúbrica no pretende establecer estas características como principios universales de calidad docente, sino valorar su cumplimiento dentro del modelo educativo de la institución.
            </p>
          </div>
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-5">
          <h4 className="font-bold text-indigo-800 text-lg mb-3 flex items-center"><Languages className="w-5 h-5 mr-2" />6.2 Clases de idiomas</h4>
          <div className="space-y-3">
            <p className="text-justify">
              En la enseñanza de idiomas, la lengua constituye simultáneamente objeto y medio de aprendizaje. Por ello, el instrumento considera oportunidades de recepción y producción, uso de la lengua meta, diseño de actividades, producción esperada, monitoreo, retroalimentación y apoyo para la comprensión y producción.
            </p>
            <p className="text-justify">
              El <em>Common European Framework of Reference for Languages: Companion Volume</em> organiza el uso de la lengua en torno a actividades de recepción, producción, interacción y mediación, reconociendo distintas formas mediante las cuales los estudiantes utilizan y construyen significado a través de la lengua.
            </p>
            <p className="text-justify">
              Ellis también destaca la importancia de las tareas como espacios en los que los estudiantes pueden trabajar con comprensión, interacción y producción lingüística, así como la necesidad de relacionar el diseño de la actividad con aquello que se espera que el estudiante haga con la lengua.
            </p>
            <p className="text-justify">
              ACTFL sostiene que la enseñanza de lenguas debe proporcionar niveles significativos de comunicación en la lengua meta y utilizar estrategias que faciliten la comprensión, la negociación de significado y la retroalimentación. Entre estas estrategias se encuentran el uso de contexto, gestos, apoyos visuales, comprobaciones de comprensión y otras formas de apoyo al significado.
            </p>
            <p className="text-justify">
              Aunque ACTFL establece recomendaciones cuantitativas sobre el uso de la lengua meta, la rúbrica institucional <strong>no convierte esta recomendación en una cuota fija de tiempo</strong>. El criterio observa la función y extensión del uso de la lengua meta dentro de la comunicación de la sesión y reconoce que otra lengua puede utilizarse estratégicamente cuando sea necesario para apoyar la comprensión.
            </p>
            <p className="text-justify">
              De manera similar, el apoyo lingüístico o <em>scaffolding</em> puede facilitar que los estudiantes comprendan y produzcan lenguaje que todavía no pueden manejar de forma completamente independiente. Gibbons describe el andamiaje como apoyo vinculado con las demandas lingüísticas de la actividad y con las necesidades de los estudiantes.
            </p>
            <p className="text-justify">
              Por esta razón, el instrumento no exige apoyos lingüísticos adicionales en todas las actividades. Su valoración depende de que exista una necesidad razonable de apoyo dentro de la producción o comprensión observada.
            </p>
            <p className="text-justify">
              La rúbrica tampoco pretende determinar la competencia lingüística global del docente a partir de una sesión. Los criterios se concentran en prácticas pedagógicas observables relacionadas con el uso y enseñanza de la lengua.
            </p>
          </div>
        </div>
      </div>
    </Accordion>

    <Accordion title="7. La observación como parte de una evaluación docente integral" icon={PieChart}>
      <div className="space-y-3 text-slate-700">
        <p className="text-justify">
          La efectividad de la enseñanza es un constructo complejo que difícilmente puede representarse de manera suficiente mediante una única fuente de información.
        </p>
        <p className="text-justify">
          En educación superior, Berk propone utilizar múltiples fuentes de evidencia para valorar la enseñanza —entre ellas evaluaciones de estudiantes, observación o valoración por colegas y superiores, autoevaluación, resultados y otros productos de la práctica— de manera que las fortalezas y limitaciones de una fuente puedan complementarse con las demás.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-sm text-blue-900">
            En consecuencia, el resultado de la observación de clase debe interpretarse como <strong>un componente de la evaluación docente y no como una valoración integral independiente</strong>.
          </p>
        </div>
        <p className="font-semibold text-slate-800">La puntuación describe la evidencia observada durante una sesión bajo los criterios definidos por el instrumento. No permite, por sí sola, concluir de manera definitiva:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>el aprendizaje alcanzado por los estudiantes;</li>
          <li>el dominio disciplinar total del docente;</li>
          <li>su competencia lingüística global;</li>
          <li>la calidad de todas sus sesiones;</li>
          <li>ni su efectividad profesional global.</li>
        </ul>
        <p className="text-justify">
          Su principal contribución consiste en proporcionar evidencia estructurada sobre prácticas específicas que pueden integrarse con otras fuentes de evaluación y utilizarse para orientar procesos de retroalimentación y desarrollo profesional.
        </p>
      </div>
    </Accordion>

    <Accordion title="8. Alcance del instrumento" icon={AlertCircle}>
      <div className="space-y-4 text-slate-700">
        <p className="text-justify">
          Las rúbricas fueron diseñadas para favorecer valoraciones más transparentes y consistentes mediante criterios explícitos, niveles diferenciados y reglas comunes de aplicación.
        </p>
        <p className="font-semibold text-slate-800">Su interpretación debe conservar siempre tres límites fundamentales:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p><strong>Evidencia.</strong> Se valora aquello que puede observarse o verificarse durante la sesión y dentro de las fuentes contempladas por el criterio.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p><strong>Contexto.</strong> La misma práctica no necesariamente resulta pertinente en todas las asignaturas, niveles, actividades o momentos.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p><strong>Alcance.</strong> Una observación representa una muestra situada de la práctica docente y no la totalidad de su desempeño profesional.</p>
          </div>
        </div>
        <p className="text-justify">
          Desde esta perspectiva, la observación no busca definir una única forma correcta de impartir clase, sino documentar con criterios comunes aquello que razonablemente puede observarse durante una sesión y utilizar esa evidencia como parte de un proceso institucional más amplio de evaluación y mejora docente.
        </p>
      </div>
    </Accordion>

    <Accordion title="Referencias bibliográficas" icon={FileText}>
      <div className="space-y-4 text-sm text-slate-600 pl-4 py-2">
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">American Council on the Teaching of Foreign Languages. (2010). <em>Use of the target language in the classroom</em>. ACTFL.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">American Educational Research Association, American Psychological Association, &amp; National Council on Measurement in Education. (2014). <em>Standards for educational and psychological testing</em>. American Educational Research Association.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Berk, R. A. (2005). Survey of 12 strategies to measure teaching effectiveness. <em>International Journal of Teaching and Learning in Higher Education, 17</em>(1), 48–62.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Biggs, J. (1996). Enhancing teaching through constructive alignment. <em>Higher Education, 32</em>(3), 347–364. <a href="https://doi.org/10.1007/BF00138871" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://doi.org/10.1007/BF00138871</a></p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Black, P., &amp; Wiliam, D. (1998). Assessment and classroom learning. <em>Assessment in Education: Principles, Policy &amp; Practice, 5</em>(1), 7–74. <a href="https://doi.org/10.1080/0969595980050102" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://doi.org/10.1080/0969595980050102</a></p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Brookhart, S. M. (2013). <em>How to create and use rubrics for formative assessment and grading</em>. ASCD.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Council of Europe. (2020). <em>Common European Framework of Reference for Languages: Learning, teaching, assessment—Companion volume</em>. Council of Europe Publishing.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Darling-Hammond, L., &amp; Snyder, J. (2000). Authentic assessment of teaching in context. <em>Teaching and Teacher Education, 16</em>(5–6), 523–545. <a href="https://doi.org/10.1016/S0742-051X(00)00015-9" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://doi.org/10.1016/S0742-051X(00)00015-9</a></p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Ellis, R. (2003). <em>Task-based language learning and teaching</em>. Oxford University Press.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Gibbons, P. (2015). <em>Scaffolding language, scaffolding learning: Teaching English language learners in the mainstream classroom</em> (2nd ed.). Heinemann.</p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Hattie, J., &amp; Timperley, H. (2007). The power of feedback. <em>Review of Educational Research, 77</em>(1), 81–112. <a href="https://doi.org/10.3102/003465430298487" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://doi.org/10.3102/003465430298487</a></p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">Jönsson, A., &amp; Svingby, G. (2007). The use of scoring rubrics: Reliability, validity and educational consequences. <em>Educational Research Review, 2</em>(2), 130–144. <a href="https://doi.org/10.1016/j.edurev.2007.05.002" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://doi.org/10.1016/j.edurev.2007.05.002</a></p>
        <p className="indent-[-1.5rem] pl-6 leading-relaxed">O'Leary, M. (2020). <em>Classroom observation: A guide to the effective observation of teaching and learning</em> (2nd ed.). Routledge.</p>
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
      <p className="text-slate-600">Resolvemos algunas dudas frecuentes sobre el proceso de observación de clase y los criterios utilizados durante la evaluación.</p>
    </div>

    <div className="space-y-2">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <HelpCircle className="w-6 h-6 mr-2 text-blue-600" /> Dudas Comunes
      </h3>

      <Accordion title="¿Qué pasa si me pongo nervioso o cometo un error durante la observación?" icon={MessageSquare}>
        <div className="space-y-3 text-slate-700">
          <p>La observación no busca una clase perfecta ni libre de imprevistos. La valoración se realiza únicamente con base en la evidencia observable correspondiente a los criterios de la rúbrica.</p>
          <p>Un error aislado, una interrupción o una situación imprevista no determinan por sí mismos la calificación de la sesión. El observador considerará las características y condiciones particulares en las que se desarrolla la clase.</p>
        </div>
      </Accordion>

      <Accordion title="¿Tengo que preparar una clase especial para el día de la observación?" icon={MessageSquare}>
        <div className="space-y-3 text-slate-700">
          <p>No. La observación busca registrar la práctica docente dentro de las condiciones habituales de la asignatura y de la sesión.</p>
          <p>No se requiere utilizar una metodología específica, incorporar actividades adicionales, trabajar en equipos, utilizar tecnología, realizar una dinámica particular de inicio o cierre ni modificar la clase únicamente con motivo de la observación.</p>
          <p>La valoración se realizará conforme a los criterios y descriptores establecidos en la rúbrica correspondiente.</p>
        </div>
      </Accordion>

      <Accordion title="¿Qué pasa si un criterio de la rúbrica no puede observarse durante mi clase?" icon={MessageSquare}>
        <div className="space-y-3 text-slate-700">
          <p>Algunos criterios dependen de que durante la sesión exista una oportunidad razonable para observarlos.</p>
          <p>Cuando, por la naturaleza de la asignatura, la actividad o las condiciones de la sesión, dicha oportunidad no exista, podrá utilizarse <strong>0 / N/A (No aplica / No observable)</strong>.</p>
          <p>El <strong>0 / N/A</strong> no representa una calificación de desempeño.</p>
          <p>Sin embargo, no deberá utilizarse cuando sí existió una oportunidad razonable de observar el criterio pero la conducta descrita no ocurrió. En ese caso se asignará el nivel correspondiente de la rúbrica.</p>
        </div>
      </Accordion>

      <Accordion title="¿Cuándo y cómo sabré mis resultados de la observación?" icon={MessageSquare}>
        <div className="space-y-3 text-slate-700">
          <p>Los resultados de la observación serán enviados al correo institucional del docente en un plazo máximo de <strong>cinco días hábiles posteriores a la sesión observada</strong>.</p>
          <p>El reporte incluirá la puntuación obtenida y la retroalimentación correspondiente a la evidencia registrada durante la observación.</p>
        </div>
      </Accordion>
    </div>

    <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>
      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center relative z-10">
        <Users className="w-6 h-6 mr-3 text-blue-600" /> Contacto Directo
      </h3>
      <div className="space-y-4 relative z-10">
        <p className="text-slate-600 mb-4">
          Si tienes alguna duda, sugerencia o comentario sobre el proceso de evaluación docente, puedes comunicarte directamente con la Coordinación de Evaluación Docente.
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
            <span className="text-sm font-medium">449 786 1786 <strong className="ml-1 text-slate-800">EXT. 1127</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);


// --- SECCIONES DE RÚBRICAS INDIVIDUALES ---

const GuideAccordion = ({ number, title, subtitle, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow print:break-inside-avoid">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-5 text-left flex items-center justify-between gap-4 transition-colors no-print ${isOpen ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
      >
        <div className="flex items-center min-w-0">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 ${isOpen ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-700'}`}>
            {Icon && <Icon className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold tracking-wider text-blue-700 uppercase">{number}</span>
              <h4 className="font-bold text-slate-800">{title}</h4>
            </div>
            <p className="text-sm text-slate-500 leading-snug">{subtitle}</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-700 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} border-t border-slate-100 p-5 md:p-6 text-sm text-slate-700 leading-relaxed print:block print:border print:border-slate-200 print:rounded-xl print:mt-3`}>
        <div className="hidden print:flex items-center mb-3">
          {Icon && <Icon className="w-5 h-5 mr-2 text-blue-700" />}
          <h4 className="font-bold text-slate-800">{number}. {title}</h4>
        </div>
        {children}
      </div>
    </div>
  );
};

const ContentObservationGuide = () => (
  <section className="mb-10 no-print-guide">
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-6 md:p-7 text-white shadow-md mb-5 relative overflow-hidden print:bg-white print:text-slate-800 print:border print:border-slate-300 print:shadow-none">
      <div className="absolute right-0 top-0 opacity-10 transform translate-x-6 -translate-y-6 no-print">
        <BookOpen className="w-36 h-36" />
      </div>
      <div className="relative z-10 max-w-3xl">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-white/15 rounded-lg mr-3 no-print">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Guía de Observación: Materias de Contenido</h2>
        </div>
        <p className="text-blue-50 leading-relaxed print:text-slate-700">
          Esta guía ofrece una referencia rápida sobre los aspectos que pueden considerarse durante la observación de clase. No es una lista de acciones obligatorias ni establece una única forma correcta de impartir una sesión.
        </p>
        <p className="text-sm text-blue-100 mt-3 font-medium no-print">
          Explora cada apartado para revisar algunas preguntas que pueden ayudarte a reflexionar sobre tu clase.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 print:block print:space-y-4">
      <GuideAccordion
        number="1"
        title="Google Classroom"
        subtitle="Estructura institucional y criterios de evaluación."
        icon={FileText}
      >
        <p className="mb-4">
          Se revisará que Classroom cuente con los cinco elementos institucionales requeridos y que se encuentren visibles y actualizados. También se revisará que las actividades o evidencias evaluables permitan identificar los criterios con los que serán evaluadas.
        </p>
        <p className="font-bold text-slate-800 mb-2">Elementos institucionales requeridos:</p>
        <ul className="list-disc pl-5 space-y-1.5 mb-4">
          <li><strong>Presentación de la asignatura:</strong> información general que permite identificar la asignatura y conocer de qué trata.</li>
          <li><strong>Resultados de Aprendizaje (RA):</strong> resultados establecidos para la asignatura.</li>
          <li><strong>Organización de contenidos:</strong> temas, unidades, bloques o alguna estructura equivalente que permita ubicar los contenidos del curso.</li>
          <li><strong>Cronograma o información temporal:</strong> horario, calendario, fechas relevantes u otra información que permita ubicar el desarrollo del curso.</li>
          <li><strong>Criterios generales de evaluación:</strong> información sobre cómo se obtiene la calificación de la asignatura.</li>
        </ul>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 text-blue-950">
          <strong>Importante:</strong> Los criterios generales de evaluación del curso son diferentes de los criterios utilizados para evaluar una actividad específica.
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 text-slate-700">
          <strong>Ejemplo:</strong> Los criterios generales pueden indicar qué porcentaje corresponde a proyectos, exámenes o actividades. Los criterios de una actividad indican qué se tomará en cuenta para evaluar ese trabajo en particular.
        </div>
        <p className="font-bold text-slate-800 mb-2">Preguntas para revisar mi curso:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>¿Los cinco elementos institucionales están visibles y actualizados en mi Classroom?</li>
          <li>Cuando una actividad será evaluada, ¿el estudiante puede identificar qué se tomará en cuenta para evaluarla?</li>
        </ul>
      </GuideAccordion>

      <GuideAccordion
        number="2"
        title="Desarrollo del contenido"
        subtitle="Explicación, aplicación, contexto profesional y seguimiento del trabajo."
        icon={BookOpen}
      >
        <p className="mb-4">
          Se observará cómo se desarrolla el contenido de la materia, cómo se utilizan ejemplos o aplicaciones, su relación con el ámbito profesional cuando corresponda y cómo el docente obtiene información sobre el trabajo de los estudiantes y responde a ella.
        </p>
        <p className="font-bold text-slate-800 mb-2">Preguntas para reflexionar:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>¿Además de presentar información, explico qué significa, cómo funciona o cómo se realiza lo que estamos trabajando?</li>
          <li>Cuando utilizo un ejemplo, ¿queda clara su relación con el contenido de la sesión?</li>
          <li>Cuando corresponde, ¿muestro dónde o cómo se utiliza este contenido en el ámbito profesional?</li>
          <li>¿Tengo alguna forma de saber qué están haciendo, respondiendo o produciendo los estudiantes?</li>
          <li>Cuando observo una dificultad o una respuesta que requiere atención, ¿la aclaración, corrección o retroalimentación que doy responde a esa situación?</li>
          <li>Después de una aclaración o retroalimentación, ¿vuelvo a revisar, observar o preguntar para saber qué ocurrió con el trabajo o la respuesta del estudiante?</li>
        </ul>
      </GuideAccordion>

      <GuideAccordion
        number="3"
        title="Vocabulario especializado en inglés"
        subtitle="Inglés técnico de acuerdo con la incorporación establecida para la asignatura."
        icon={Languages}
      >
        <p className="mb-4">
          Cuando corresponda de acuerdo con la incorporación de inglés establecida para la asignatura, se observará el uso de vocabulario técnico en inglés y las oportunidades que tienen los estudiantes para trabajar con él.
        </p>
        <p className="font-bold text-slate-800 mb-2">Preguntas para reflexionar:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>¿Estoy incorporando el vocabulario técnico en inglés propio de mi asignatura?</li>
          <li>¿Lo utilizo dentro de las explicaciones del contenido y no solamente como palabras aisladas?</li>
          <li>¿Las actividades ofrecen alguna oportunidad para que los estudiantes reconozcan, nombren o utilicen ese vocabulario?</li>
        </ul>
      </GuideAccordion>

      <GuideAccordion
        number="4"
        title="Desarrollo de las actividades"
        subtitle="Instrucciones y expectativas de los trabajos, respuestas o productos."
        icon={PlayCircle}
      >
        <p className="mb-4">
          Se observará si las instrucciones permiten identificar qué debe realizarse y cómo proceder, así como qué trabajo, respuesta o producto se espera obtener.
        </p>
        <p className="font-bold text-slate-800 mb-2">Preguntas para reflexionar:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>¿Mis instrucciones permiten identificar qué debe hacerse?</li>
          <li>Cuando la actividad lo requiere, ¿doy suficiente orientación para saber cómo proceder?</li>
          <li>¿El estudiante puede identificar qué resultado, respuesta o producto se espera de la actividad?</li>
          <li>Cuando existen requisitos, condiciones o criterios específicos, ¿el estudiante puede identificarlos?</li>
        </ul>
      </GuideAccordion>
    </div>

    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 mb-4 print:break-inside-avoid">
      <div className="flex items-start">
        <div className="p-2 rounded-lg bg-blue-100 text-blue-700 mr-4 flex-shrink-0">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg mb-3">Antes de la observación, puede ser útil preguntarme…</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700 list-disc pl-5 md:pl-0 md:list-none">
            <li>¿Qué quiero trabajar en esta sesión?</li>
            <li>¿Qué espero que los estudiantes hagan durante ella?</li>
            <li>¿Cómo sabré qué está ocurriendo con su trabajo o sus respuestas?</li>
            <li>Si surge una dificultad, ¿qué posibilidades tengo para responder?</li>
            <li className="md:col-span-2">¿Hay algo de esta sesión que quisiera que el observador considere especialmente?</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="flex items-start bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4 text-sm text-blue-950 print:border print:border-blue-200 print:rounded-lg">
      <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
      <p>
        <strong>Importante:</strong> Estas preguntas tienen un propósito reflexivo. No constituyen una lista de acciones obligatorias ni implican que exista una única forma correcta de impartir clase. Es posible que algunos aspectos de la guía no correspondan a todas las sesiones. La valoración se realizará únicamente con base en las evidencias que puedan observarse de acuerdo con las características de cada clase.
      </p>
    </div>
  </section>
);

const GuiasObservacion = () => {
  const [tipoGuia, setTipoGuia] = useState('contenido');

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl pb-16">
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Guías de Observación</h2>
        <p className="text-slate-600 max-w-3xl">
          Consulta materiales de orientación para conocer los aspectos que pueden considerarse durante la observación. Las guías tienen un propósito reflexivo y no sustituyen los criterios establecidos en las rúbricas de evaluación.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200 no-print">
        <button
          type="button"
          onClick={() => setTipoGuia('contenido')}
          className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
            tipoGuia === 'contenido'
              ? 'bg-white text-blue-800 shadow-sm border border-blue-200'
              : 'text-slate-600 hover:bg-white/70 hover:text-blue-700'
          }`}
        >
          <BookOpen className="w-4 h-4 mr-2" /> Materias de Contenido
        </button>
        <button
          type="button"
          onClick={() => setTipoGuia('idiomas')}
          className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
            tipoGuia === 'idiomas'
              ? 'bg-white text-indigo-800 shadow-sm border border-indigo-200'
              : 'text-slate-600 hover:bg-white/70 hover:text-indigo-700'
          }`}
        >
          <Languages className="w-4 h-4 mr-2" /> Clases de Idiomas
        </button>
      </div>

      {tipoGuia === 'contenido' ? (
        <ContentObservationGuide />
      ) : (
        <div className="pt-1">
          <VideoEmbed
            title="Guía de Observación: Clases de Idiomas"
            description="Material preparatorio para conocer los aspectos generales considerados durante la observación de clases de idiomas."
            embedId="eDHtNsIa9wE"
            colorTheme="indigo"
          />
          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-lg p-4 text-sm text-indigo-950">
            Esta guía es un material de orientación. Los criterios y niveles que determinan la valoración se encuentran exclusivamente en la rúbrica de idiomas publicada en la sección de Rúbricas de Evaluación.
          </div>
        </div>
      )}
    </div>
  );
};

const ContenidoAula = () => (
  <div className="animate-fade-in">
    <Accordion title="1. GOOGLE CLASSROOM" icon={FileText} defaultOpen={false}>
      <CriterionTable 
        number="1.1" 
        title="Estructura base de Classroom"
        levels={[
          {score: 5, text: "Los cinco elementos requeridos están visibles y actualizados."},
          {score: 4, text: "Cuatro de los cinco elementos requeridos están visibles y actualizados."},
          {score: 3, text: "Tres de los cinco elementos requeridos están visibles y actualizados."},
          {score: 2, text: "Uno o dos de los cinco elementos requeridos están visibles y actualizados."},
          {score: 1, text: "Ninguno de los cinco elementos requeridos está visible y actualizado."}
        ]}
        naLabel="No fue posible realizar la revisión de Classroom durante el periodo de evaluación."
      />

      <CriterionTable 
        number="1.2" 
        title="Criterios de evaluación en evidencias/actividades"
        levels={[
          {score: 5, text: "Todas las evidencias o actividades evaluables observadas incluyen criterios de evaluación identificables."},
          {score: 4, text: "Al menos el 75% de las evidencias o actividades evaluables observadas incluyen criterios de evaluación identificables."},
          {score: 3, text: "Entre el 50% y menos del 75% incluyen criterios de evaluación identificables."},
          {score: 2, text: "Menos del 50% incluyen criterios de evaluación identificables."},
          {score: 1, text: "Ninguna evidencia o actividad evaluable observada incluye criterios de evaluación identificables."}
        ]}
        naLabel="No se observaron evidencias o actividades evaluables durante la revisión."
      />
    </Accordion>

    <Accordion title="2. CONTENIDO DE LA MATERIA" icon={BookOpen} defaultOpen={false}>
      <CriterionTable 
        number="2.1" 
        title="Explicación de Contenidos"
        levels={[
          {score: 5, text: "Explica cómo las relaciones entre sus conceptos, componentes, pasos o criterios intervienen en el funcionamiento, procedimiento o resultado del contenido trabajado."},
          {score: 4, text: "Explica el contenido estableciendo relaciones explícitas entre sus conceptos, componentes, pasos o criterios."},
          {score: 3, text: "Explica el contenido desarrollando el significado, funcionamiento o procedimiento correspondiente al tema de la sesión."},
          {score: 2, text: "Presenta información, definiciones, datos o pasos relacionados con el tema, sin desarrollar cómo funcionan o se relacionan."},
          {score: 1, text: "No se observan explicaciones relacionadas con el contenido de la sesión."}
        ]}
        naLabel="No fue posible observar explicación o interacción relacionada con el contenido disciplinar."
      />

      <CriterionTable 
        number="2.2" 
        title="Ejemplos y aplicación del contenido"
        levels={[
          {score: 5, text: "El ejemplo o aplicación se acompaña de una explicación que relaciona de manera directa el contenido trabajado con la situación presentada."},
          {score: 4, text: "Se presenta un ejemplo o aplicación directamente relacionado con el contenido trabajado."},
          {score: 3, text: "Se presenta un ejemplo o aplicación relacionado con el tema abordado, pero sin una relación explícita con el contenido trabajado."},
          {score: 2, text: "Se menciona un ejemplo o aplicación de forma aislada, sin relación identificable con el tema o contenido desarrollado."},
          {score: 1, text: "No se observan ejemplos o aplicaciones relacionadas con el contenido."}
        ]}
        naLabel="No fue posible observar desarrollo de contenido disciplinar durante la sesión."
      />

      <CriterionTable 
        number="2.3" 
        title="Vinculación con el contexto profesional"
        levels={[
          {score: 5, text: "Explica cómo el contenido trabajado interviene en una tarea, función, proceso o situación específica del ámbito profesional."},
          {score: 4, text: "Identifica de manera explícita una tarea, función, proceso o situación del ámbito profesional en la que se utiliza el contenido trabajado."},
          {score: 3, text: "Hace referencias al ámbito profesional relacionadas con el contenido trabajado, sin explicar la relación entre ambos."},
          {score: 2, text: "Hace referencias generales al ámbito profesional sin establecer su relación con el contenido trabajado."},
          {score: 1, text: "No se observan referencias al contexto profesional cuando el criterio resulta aplicable."}
        ]}
        naLabel="La naturaleza de la sesión no contempló una relación observable con el contexto profesional."
      />

      <CriterionTable 
        number="2.4" 
        title="Verificación y Retroalimentación"
        levels={[
          {score: 5, text: "Después de una intervención o retroalimentación, vuelve a observar, revisar o preguntar sobre la respuesta, procedimiento o producto del estudiante."},
          {score: 4, text: "Utiliza información obtenida del trabajo o respuestas de los estudiantes para realizar una aclaración, corrección, indicación o retroalimentación específica."},
          {score: 3, text: "Obtiene información sobre el trabajo o las respuestas de los estudiantes mediante preguntas, observación del trabajo, revisión de respuestas, procedimientos o productos."},
          {score: 2, text: "Realiza preguntas o comentarios generales sobre el avance de la actividad, sin obtener evidencia identificable del trabajo o respuesta de los estudiantes."},
          {score: 1, text: "No se observan acciones para obtener información sobre el trabajo de los estudiantes cuando la dinámica permite hacerlo."}
        ]}
        naLabel="La dinámica de la sesión no permitió observar acciones de verificación o retroalimentación."
      />
    </Accordion>

    <Accordion title="3. USO DE VOCABULARIO ESPECIALIZADO EN INGLÉS" icon={Languages} defaultOpen={false}>
      <CriterionTable 
        number="3.1" 
        title="Uso de vocabulario disciplinar en inglés"
        levels={[
          {score: 5, text: "Utiliza vocabulario técnico en inglés para explicar conceptos, procesos, componentes o procedimientos de la materia."},
          {score: 4, text: "Utiliza vocabulario técnico en inglés para nombrar conceptos, procesos, componentes o elementos relacionados con el contenido."},
          {score: 3, text: "Utiliza vocabulario en inglés relacionado con el tema de la sesión, sin evidenciar vocabulario técnico disciplinar."},
          {score: 2, text: "Utiliza palabras o expresiones en inglés de forma aislada, sin relación identificable con el contenido disciplinar."},
          {score: 1, text: "No se observa uso de vocabulario técnico en inglés cuando corresponde de acuerdo con la asignatura."}
        ]}
        naLabel="La asignatura observada no contempla incorporación de inglés de acuerdo con la progresión institucional."
      />

      <CriterionTable 
        number="3.2" 
        title="Oportunidades de producción de vocabulario técnico en inglés"
        levels={[
          {score: 5, text: "La consigna solicita utilizar vocabulario técnico en inglés."},
          {score: 4, text: "La consigna solicita identificar o nombrar en inglés conceptos, componentes, procesos o elementos de la materia."},
          {score: 3, text: "La actividad incorpora vocabulario técnico en inglés para lectura, consulta o referencia."},
          {score: 2, text: "Durante la actividad aparecen palabras o expresiones en inglés, pero la consigna no solicita utilizar vocabulario técnico en inglés."},
          {score: 1, text: "La actividad se desarrolla sin uso de vocabulario técnico en inglés cuando corresponde incorporarlo."}
        ]}
        naLabel="La asignatura no contempla incorporación de inglés de acuerdo con la progresión institucional."
      />
    </Accordion>

    <Accordion title="4. DESARROLLO DE LA CLASE" icon={PlayCircle} defaultOpen={false}>
      <CriterionTable 
        number="4.1" 
        title="Organización e Instrucciones de Trabajo"
        levels={[
          {score: 5, text: "Explica qué debe realizarse y cómo proceder para desarrollar la actividad."},
          {score: 4, text: "Indica qué debe realizarse y proporciona orientación sobre cómo proceder, aunque deja aspectos del desarrollo sin especificar."},
          {score: 3, text: "Indica qué debe realizarse, sin explicar cómo proceder."},
          {score: 2, text: "Proporciona indicaciones parciales o fragmentadas que no permiten identificar completamente qué debe realizarse."},
          {score: 1, text: "No se observan instrucciones que permitan identificar qué deben realizar los estudiantes."}
        ]}
        naLabel="La sesión no contempló actividades que requirieran instrucciones observables."
      />

      <CriterionTable 
        number="4.2" 
        title="Claridad de expectativas de la actividad"
        levels={[
          {score: 5, text: "Comunica criterios que permiten determinar si el trabajo, respuesta o producto cumple con lo esperado, más allá de indicar sus componentes o requisitos."},
          {score: 4, text: "Comunica los componentes, requisitos o condiciones que debe cumplir el trabajo, respuesta o producto."},
          {score: 3, text: "Comunica qué trabajo, respuesta o producto se espera obtener."},
          {score: 2, text: "Comunica la actividad a realizar, sin precisar qué resultado se espera."},
          {score: 1, text: "No se observa información que permita identificar qué trabajo, respuesta o producto se espera obtener."}
        ]}
        naLabel="La sesión no contempló una actividad que requiriera comunicar un resultado o producto esperado."
      />
    </Accordion>
  </div>
);

const ContenidoIdiomas = () => (
  <div className="animate-fade-in">
    <Accordion title="1. TARGET-LANGUAGE USE AND PRODUCTION" icon={Languages} defaultOpen={false}>
      <CriterionTable 
        number="1.1" 
        title="Opportunities for Target-Language Production"
        levels={[
          {score: 5, text: "The activity asks students to produce spoken or written language in the target language to express information, ideas, or messages."},
          {score: 4, text: "The activity asks students to complete, reproduce, or transform language provided in the target language."},
          {score: 3, text: "The activity asks students to identify, select, recognize, or otherwise work directly with the language content, skill, or communicative function being developed, without asking students to produce language."},
          {score: 2, text: "The activity exposes students to the target language through listening, reading, consultation, or reference, without an identifiable connection to the language content, skill, or communicative function being developed and without asking students to produce language."},
          {score: 1, text: "No observable opportunities to work with or use the target language are provided during the session."}
        ]}
        naLabel="It was not possible to observe activities that allowed this criterion to be evaluated."
      />

      <CriterionTable 
        number="1.2" 
        title="Teacher Use of the Target Language"
        levels={[
          {score: 5, text: "The teacher uses the target language as the main language for instructional communication, using another language strategically when needed to support understanding."},
          {score: 4, text: "The teacher uses the target language for extended explanations, instructions, or classroom interaction, while also relying on another language for part of the instructional communication."},
          {score: 3, text: "The teacher uses the target language in brief explanations, instructions, or classroom exchanges related to the lesson."},
          {score: 2, text: "The teacher's use of the target language is limited to isolated words, expressions, or classroom routines."},
          {score: 1, text: "No observable use of the target language occurs during the session."}
        ]}
        naLabel="It was not possible to observe oral communication during the session."
      />
    </Accordion>

    <Accordion title="2. ACTIVITY DESIGN AND EXPECTATIONS" icon={ClipboardList} defaultOpen={false}>
      <CriterionTable 
        number="2.1" 
        title="Alignment of Activities with Lesson Content"
        levels={[
          {score: 5, text: "The activity asks students to work with the language content, skill, or communicative function developed during the lesson."},
          {score: 4, text: "The activity presents the language content, skill, or communicative function developed during the lesson."},
          {score: 3, text: "The activity is directly related to the lesson content, but does not include the specific language content, skill, or communicative function being developed."},
          {score: 2, text: "The activity is related to the general topic of the lesson without an identifiable connection to the language content, skill, or communicative function being developed."},
          {score: 1, text: "No identifiable relation is observed between the activity and the lesson content."}
        ]}
        naLabel="The session did not include activities that allowed this criterion to be evaluated."
      />

      <CriterionTable 
        number="2.2" 
        title="Activity Instructions"
        levels={[
          {score: 5, text: "The teacher explains what students are expected to do and how to proceed during the activity."},
          {score: 4, text: "The teacher explains what students are expected to do and provides some guidance on how to proceed, while leaving aspects of the activity development unspecified."},
          {score: 3, text: "The teacher indicates what students are expected to do without explaining how to proceed."},
          {score: 2, text: "The teacher provides partial or fragmented instructions that do not fully identify what students are expected to do."},
          {score: 1, text: "No observable instructions allow students to identify what they are expected to do."}
        ]}
        naLabel="The session did not include activities requiring observable instructions."
      />

      <CriterionTable 
        number="2.3" 
        title="Activity Expectations and Expected Language Output"
        levels={[
          {score: 5, text: "The teacher communicates the expected spoken or written response, product, or outcome in a way that identifies what students are expected to communicate or demonstrate through it."},
          {score: 4, text: "The teacher communicates the expected spoken or written response, product, or outcome."},
          {score: 3, text: "The teacher identifies the type of response or product students are expected to produce, without specifying what it is expected to communicate or demonstrate."},
          {score: 2, text: "The teacher communicates the activity to be completed, without identifying the expected response, product, or outcome."},
          {score: 1, text: "No observable information allows the expected student response, product, or outcome to be identified."}
        ]}
        naLabel="The session did not include an activity with an observable expected response, product, or outcome."
      />
    </Accordion>

    <Accordion title="3. MONITORING AND RESPONSE TO STUDENT WORK" icon={Search} defaultOpen={false}>
      <CriterionTable 
        number="3.1" 
        title="Monitoring Student Work and Language Use"
        levels={[
          {score: 5, text: "The teacher reviews or listens to an identifiable student response, work, or output produced during the activity."},
          {score: 4, text: "The teacher observes how students are carrying out the activity, without reviewing identifiable responses, work, or productions."},
          {score: 3, text: "The teacher checks whether students are participating in or progressing through the activity."},
          {score: 2, text: "The teacher checks only whether the activity has been started, continued, or completed."},
          {score: 1, text: "No observable monitoring occurs when the activity provides a reasonable opportunity for it."}
        ]}
        naLabel="The session did not provide a reasonable opportunity to observe student work or language use."
      />

      <CriterionTable 
        number="3.2" 
        title="Feedback on Student Language Use"
        levels={[
          {score: 5, text: "The teacher provides feedback on an identifiable aspect of the student's spoken or written language production and gives information the student can use to maintain, adjust, or revise that language use."},
          {score: 4, text: "The teacher provides a correction, confirmation, reformulation, or comment related to a specific aspect of the student's spoken or written language production."},
          {score: 3, text: "The teacher indicates whether the student's language production is correct, appropriate, or needs revision, without addressing a specific aspect of the language produced."},
          {score: 2, text: "The teacher acknowledges the student's language production without providing information about it."},
          {score: 1, text: "No observable feedback is provided when student language production creates a reasonable opportunity for it."}
        ]}
        naLabel="The session did not provide a reasonable opportunity to observe feedback on student language production."
      />

      <CriterionTable 
        number="3.3" 
        title="Responsive Support During the Lesson"
        levels={[
          {score: 5, text: "The teacher provides information, clarification, guidance, explanation, an example, or other support that addresses the student's question or identified difficulty."},
          {score: 4, text: "The teacher provides information or support related to the student's question or identified difficulty, but only partially addresses the issue raised."},
          {score: 3, text: "The teacher responds to the question or difficulty without providing information that addresses the issue raised."},
          {score: 2, text: "The teacher acknowledges the question or difficulty without attempting to address it."},
          {score: 1, text: "No observable response is provided when a student question, request for clarification, or identifiable difficulty creates a reasonable opportunity for it."}
        ]}
        naLabel="The session did not provide a reasonable opportunity to observe responsive support."
      />
    </Accordion>

    <Accordion title="4. LANGUAGE SUPPORT" icon={MessageSquare} defaultOpen={false}>
      <CriterionTable 
        number="4.1" 
        title="Support for Target-Language Production"
        levels={[
          {score: 5, text: "When language support is needed, the teacher provides words, expressions, sentence starters, models, or other language that students can incorporate directly into the spoken or written production expected in the activity."},
          {score: 4, text: "When language support is needed, the teacher provides language related to the expected production, without providing language that can be incorporated directly into the expected production."},
          {score: 3, text: "When language support is needed, the teacher provides language related to the lesson, but its connection to the expected production is not clearly identified."},
          {score: 2, text: "When language support is needed, the teacher provides general help or clarification without providing language students can use in the expected production."},
          {score: 1, text: "No observable language support is provided when the activity or an observable student difficulty creates a reasonable need for it."}
        ]}
        naLabel="The session did not include a situation in which support for target-language production was reasonably needed."
      />

      <CriterionTable 
        number="4.2" 
        title="Support for Target-Language Comprehension"
        levels={[
          {score: 5, text: "The teacher supports target-language comprehension through context, modeling, examples, visual or verbal references, reformulation, or other resources that allow the intended meaning to be identified while maintaining the target language as part of the communication."},
          {score: 4, text: "The teacher provides support related to the meaning of the target-language input, but relies partly on direct explanation or translation in another language to convey the message."},
          {score: 3, text: "The teacher mainly uses direct translation or equivalent expressions in another language to establish the meaning of target-language input."},
          {score: 2, text: "The teacher repeats target-language input or provides limited support without adding information that helps identify its meaning."},
          {score: 1, text: "No observable support for understanding target-language input is provided when such support is reasonably needed."}
        ]}
        naLabel="The session did not provide a reasonable opportunity to observe support for target-language comprehension."
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
      <div className="mb-2 flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-200 pb-4 print:border-none print:pb-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Rúbricas de Evaluación</h2>
          <p className="text-slate-600 no-print">Selecciona el componente del proceso de evaluación y consulta el instrumento correspondiente.</p>
        </div>
      </div>

      {/* SUBTEMAS DEL MODELO DE EVALUACIÓN */}
      <div className="no-print">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Componente de evaluación</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            className="flex-shrink-0 inline-flex items-center px-4 py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-bold shadow-sm"
          >
            <Search className="w-4 h-4 mr-2" /> Observación en Aula
          </button>
          {[
            { label: 'Estudiantes', icon: Users },
            { label: 'Jefe de Departamento', icon: ClipboardList },
            { label: 'Pares Académicos', icon: UserCheck },
            { label: 'Autoevaluación', icon: BookOpen },
          ].map((item) => {
            const ItemIcon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                disabled
                title="Instrumento pendiente de incorporación"
                className="flex-shrink-0 inline-flex items-center px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 text-sm font-bold cursor-not-allowed"
              >
                <ItemIcon className="w-4 h-4 mr-2" /> {item.label}
                <span className="ml-2 text-[10px] uppercase tracking-wider bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Próximamente</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 no-print">
        <h3 className="text-xl font-bold text-slate-800">Rúbricas de Observación en Aula</h3>
        <p className="text-sm text-slate-500 mt-1">Selecciona el tipo de clase para consultar el instrumento correspondiente.</p>
      </div>

      {/* SELECTOR PRINCIPAL DE RÚBRICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
        <button
          type="button"
          aria-pressed={tipoRubrica === 'contenido'}
          onClick={() => setTipoRubrica('contenido')}
          className={`group relative text-left rounded-2xl border-2 p-6 transition-all duration-200 ${
            tipoRubrica === 'contenido'
              ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-100'
              : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md'
          }`}
        >
          {tipoRubrica === 'contenido' && (
            <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <CheckSquare className="w-3.5 h-3.5 mr-1.5" /> Seleccionada
            </span>
          )}
          <div className="flex items-start pr-24">
            <div className={`p-3 rounded-xl mr-4 ${tipoRubrica === 'contenido' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'}`}>
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">Rúbrica de observación</p>
              <h3 className="text-xl font-bold text-slate-900">Materias de Contenido</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">Asignaturas disciplinares, técnicas y profesionales.</p>
              <p className="text-sm font-bold text-blue-700 mt-4">Ver rúbrica →</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          aria-pressed={tipoRubrica === 'idiomas'}
          onClick={() => setTipoRubrica('idiomas')}
          className={`group relative text-left rounded-2xl border-2 p-6 transition-all duration-200 ${
            tipoRubrica === 'idiomas'
              ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-100'
              : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-md'
          }`}
        >
          {tipoRubrica === 'idiomas' && (
            <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-indigo-700 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <CheckSquare className="w-3.5 h-3.5 mr-1.5" /> Seleccionada
            </span>
          )}
          <div className="flex items-start pr-24">
            <div className={`p-3 rounded-xl mr-4 ${tipoRubrica === 'idiomas' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
              <Languages className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Rúbrica de observación</p>
              <h3 className="text-xl font-bold text-slate-900">Clases de Idiomas</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">Inglés, francés, alemán y japonés.</p>
              <p className="text-sm font-bold text-indigo-700 mt-4">View rubric →</p>
            </div>
          </div>
        </button>
      </div>

      {/* SELECTOR COMPACTO VISIBLE DURANTE EL DESPLAZAMIENTO */}
      <div className="sticky top-2 z-30 no-print">
        <div className="bg-white/95 backdrop-blur border border-slate-200 rounded-xl shadow-md p-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="px-2">
            <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Actualmente estás consultando</p>
            <p className={`text-sm font-bold ${tipoRubrica === 'contenido' ? 'text-blue-800' : 'text-indigo-800'}`}>
              {tipoRubrica === 'contenido' ? 'Materias de Contenido' : 'Clases de Idiomas'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setTipoRubrica('contenido')}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                tipoRubrica === 'contenido'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" /> Contenido
            </button>
            <button
              type="button"
              onClick={() => setTipoRubrica('idiomas')}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                tipoRubrica === 'idiomas'
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
              }`}
            >
              <Languages className="w-4 h-4 mr-2" /> Idiomas
            </button>
          </div>
        </div>
      </div>

      {tipoRubrica === 'contenido' ? (
        <>
          <LineamientosContenido />
          <EscalaObjetivaContenido />
        </>
      ) : (
        <>
          <GuidelinesLanguages />
          <RatingScaleLanguages />
        </>
      )}

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
    const validTabs = ['introduccion', 'inicio', 'calendario', 'guias', 'rubricas', 'marco', 'faq'];
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
      const validTabs = ['introduccion', 'inicio', 'calendario', 'guias', 'rubricas', 'marco', 'faq'];
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
    { id: 'guias', label: 'Guías de Observación', icon: FileText },
    { id: 'rubricas', label: 'Rúbricas de Evaluación', icon: CheckSquare },
    { id: 'marco', label: 'Marco Teórico', icon: BookOpen },
    { id: 'faq', label: 'FAQ y Contacto', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'introduccion': return <Introduccion setActiveTab={handleTabChange} />;
      case 'inicio': return <Dashboard />;
      case 'marco': return <MarcoTeorico />;
      case 'guias': return <GuiasObservacion />;
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