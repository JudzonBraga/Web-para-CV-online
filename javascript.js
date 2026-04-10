// ===== CONFIGURACIÓN =====
        const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRR28qxQ7e-0D2BXZeEieWq8oKZ3mrsd5e4ovivQfXrpvG2cs3jkSEF2_5NNVSL3aWbU2oGzDao40FR/pub?output=csv';
        const ITEMS_PER_PAGE = 12;
        const BASE_URL = 'https://sites.google.com/view/cv-iux';

        // ===== DATOS PARA LLENADO DE CONTACTO =====
        const ubicaciones = {
            "Lima": {
                provincias: ["Lima", "Barranca", "Canta", "Cañete", "Huaral", "Huarochirí", "Huaura", "Oyón", "Yauyos"],
                distritos: {
                    "Lima": ["Lima", "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurín", "Magdalena del Mar", "Miraflores", "Pachacamac", "Pucusana", "Pueblo Libre", "Puente Piedra", "Punta Hermosa", "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santa Anita", "Santa María del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa María del Triunfo"]
                }
            },
            "Arequipa": {
                provincias: ["Arequipa", "Camaná", "Caravelí", "Castilla", "Caylloma", "Condesuyos", "Islay", "La Unión"],
                distritos: {
                    "Arequipa": ["Arequipa", "Alto Selva Alegre", "Cayma", "Cerro Colorado", "Characato", "Chiguata", "Jacobo Hunter", "José Luis Bustamante y Rivero", "La Joya", "Mariano Melgar", "Miraflores", "Mollebaya", "Paucarpata", "Pocsi", "Polobaya", "Quequeña", "Sabandía", "Sachaca", "San Juan de Siguas", "San Juan de Tarucani", "Santa Isabel de Siguas", "Santa Rita de Siguas", "Socabaya", "Tiabaya", "Uchumayo", "Vítor", "Yanahuara", "Yarabamba", "Yura"]
                }
            },
            "Cusco": {
                provincias: ["Cusco", "Acomayo", "Anta", "Calca", "Canas", "Canchis", "Chumbivilcas", "Espinar", "La Convención", "Paruro", "Paucartambo", "Quispicanchi", "Urubamba"],
                distritos: {
                    "Cusco": ["Cusco", "Ccorca", "Poroy", "San Jerónimo", "San Sebastián", "Santiago", "Saylla", "Wanchaq"]
                }
            },
            "La Libertad": {
                provincias: ["Trujillo", "Ascope", "Bolívar", "Chepén", "Gran Chimú", "Julcán", "Otuzco", "Pacasmayo", "Pataz", "Sánchez Carrión", "Santiago de Chuco", "Virú"],
                distritos: {
                    "Trujillo": ["Trujillo", "El Porvenir", "Florencia de Mora", "Huanchaco", "La Esperanza", "Laredo", "Moche", "Poroto", "Salaverry", "Simbal", "Víctor Larco Herrera"]
                }
            },
            "Piura": {
                provincias: ["Piura", "Ayabaca", "Huancabamba", "Morropón", "Paita", "Sullana", "Talara", "Sechura"],
                distritos: {
                    "Piura": ["Piura", "Castilla", "Catacaos", "Cura Mori", "El Tallán", "La Arena", "La Unión", "Las Lomas", "Tambo Grande", "Veintiséis de Octubre"]
                }
            }
        };

        // DATOS DE EMPRESAS
        const empresasData = [
            { 
        id: 1, 
        nombre: "Google", 
        industria: "Tecnología", 
        contratando: true, 
        icono: "🔍",
        descripcion: "🏢 ACERCA DE NOSOTROS: Google fue fundada en 1998 por Larry Page y Sergey Brin mientras eran estudiantes de doctorado en la Universidad de Stanford. Desde entonces, hemos crecido hasta convertirnos en una de las empresas más influyentes del mundo, con presencia en más de 50 países. Nuestra misión es organizar la información del mundo y hacerla universalmente accesible y útil. Creemos en la innovación constante, la colaboración y el impacto positivo en la sociedad. Ofrecemos beneficios excepcionales como comida gratuita, horarios flexibles, opciones de trabajo remoto y un ambiente laboral inclusivo y diverso."
    },
    { 
        id: 2, 
        nombre: "Microsoft", 
        industria: "Software", 
        contratando: true, 
        icono: "💻",
        descripcion: "🏢 ACERCA DE NOSOTROS: Fundada por Bill Gates y Paul Allen en 1975, Microsoft ha sido pionera en la revolución de la computación personal. Con más de 220,000 empleados en todo el mundo, nuestra misión es empoderar a cada persona y cada organización del planeta para que logren más. Creemos en una cultura de crecimiento, donde se valora el aprendizaje continuo, la diversidad y la inclusión. Ofrecemos beneficios como seguro médico premium, planes de jubilación, días libres ilimitados y programas de desarrollo profesional"
    },
    { 
        id: 3, 
        nombre: "Apple", 
        industria: "Electrónica", 
        contratando: false, 
        icono: "🍎",
        descripcion: "🏢 ACERCA DE NOSOTROS: Apple fue fundada por Steve Jobs, Steve Wozniak y Ronald Wayne en 1976. Desde entonces, hemos revolucionado la industria de la tecnología con productos innovadores como el iPhone, iPad, Mac y Apple Watch. Con más de 160,000 empleados, nuestra misión es crear los mejores productos del mundo que enriquezcan la vida de las personas. Creemos en la simplicidad, la excelencia y la atención al detalle. Ofrecemos beneficios competitivos, opciones de compra de acciones y un ambiente laboral creativo."
    },
    { 
        id: 4, 
        nombre: "Amazon", 
        industria: "E-commerce", 
        contratando: true, 
        icono: "📦",
        descripcion: "🏢 ACERCA DE NOSOTROS: Fundada por Jeff Bezos en 1994 como una librería en línea, Amazon se ha convertido en el gigante mundial del comercio electrónico y servicios en la nube. Con más de 1.5 millones de empleados, nuestra misión es ser la empresa más centrada en el cliente del mundo. Creemos en los 14 principios de liderazgo que guían nuestras decisiones diarias. Ofrecemos salarios competitivos, beneficios de salud, opciones de trabajo remoto y programas de desarrollo profesional como Career Choice."
    },
    { 
        id: 5, 
        nombre: "Meta", 
        industria: "Redes Sociales", 
        contratando: true, 
        icono: "🌐",
        descripcion: "🏢 ACERCA DE NOSOTROS: Meta (anteriormente Facebook) fue fundada por Mark Zuckerberg en 2004. Hoy somos una empresa de tecnología global que conecta a más de 3 mil millones de personas a través de nuestras plataformas: Facebook, Instagram, WhatsApp y Messenger. Nuestra misión es dar a las personas el poder de construir comunidad y acercar el mundo más. Creemos en el movimiento rápido, la iteración constante y el impacto a gran escala. Ofrecemos beneficios excepcionales como comida gratuita, transporte, seguro médico premium y un ambiente laboral vibrante."
    },
    { 
        id: 6, 
        nombre: "Netflix", 
        industria: "Entretenimiento", 
        contratando: false, 
        icono: "🎬",
        descripcion: "🏢 ACERCA DE NOSOTROS: Netflix fue fundada por Reed Hastings y Marc Randolph en 1997 como un servicio de alquiler de DVD por correo. Hoy somos el servicio de streaming líder mundial con más de 260 millones de suscriptores en más de 190 países. Nuestra misión es entretener al mundo con contenido original de alta calidad. Creemos en la libertad y responsabilidad, donde se valora el juicio y la comunicación directa. Ofrecemos salarios altos, vacaciones ilimitadas y un ambiente laboral de alto rendimiento."
    },
    { 
        id: 7, 
        nombre: "Tesla", 
        industria: "Automotriz", 
        contratando: true, 
        icono: "🚗",
        descripcion: "🏢 ACERCA DE NOSOTROS: Tesla fue fundada por Martin Eberhard y Marc Tarpenning en 2003, pero es conocida mundialmente por el liderazgo de Elon Musk. Nuestra misión es acelerar la transición del mundo hacia la energía sostenible. Diseñamos y fabricamos vehículos eléctricos, baterías, paneles solares y productos de energía renovable. Con más de 140,000 empleados, creemos en trabajar con pasión, superar obstáculos y pensar de manera innovadora. Ofrecemos beneficios competitivos, opciones de acciones y la oportunidad de trabajar en tecnología de vanguardia."
    },
    { 
        id: 8, 
        nombre: "IBM", 
        industria: "Consultoría TI", 
        contratando: true, 
        icono: "🔷",
        descripcion: "🏢 ACERCA DE NOSOTROS: IBM (International Business Machines) fue fundada en 1911 y es una de las empresas tecnológicas más antiguas del mundo. Con más de 280,000 empleados en 170 países, nos hemos reinventado constantemente para mantenernos a la vanguardia de la innovación. Nuestra misión es ser la empresa de tecnología más confiable del mundo, ayudando a nuestros clientes a resolver sus problemas más complejos. Creemos en la integridad, la responsabilidad y el servicio al cliente. Ofrecemos beneficios integrales, programas de desarrollo profesional y oportunidades de movilidad internacional."
    },
    { 
        id: 9, 
        nombre: "Oracle", 
        industria: "Software", 
        contratando: true, 
        icono: "☁️",
        descripcion: "🏢 ACERCA DE NOSOTROS: Oracle fue fundada por Larry Ellison, Bob Miner y Ed Oates en 1977. Somos líderes mundiales en soluciones de bases de datos y software empresarial en la nube. Con más de 160,000 empleados en 175 países, nuestra misión es ayudar a las organizaciones a gestionar sus datos y operaciones de manera eficiente. Creemos en la excelencia técnica, la innovación constante y la orientación al cliente. Ofrecemos salarios competitivos, beneficios de salud y oportunidades de desarrollo profesional."
    },
    { 
        id: 10, 
        nombre: "Salesforce", 
        industria: "CRM", 
        contratando: true, 
        icono: "🤝",
        descripcion: "🏢 ACERCA DE NOSOTROS: Salesforce fue fundada por Marc Benioff en 1999 y es el líder mundial en software de gestión de relaciones con clientes (CRM). Con más de 70,000 empleados, nuestra misión es ayudar a las empresas a conectarse con sus clientes de nuevas maneras. Creemos en el modelo 1-1-1 de filantropía (1% de capital, 1% de producto, 1% de tiempo para la comunidad). Ofrecemos beneficios excepcionales, opciones de trabajo remoto y un ambiente laboral inclusivo y diverso."
    },
    { 
        id: 11, 
        nombre: "Adobe", 
        industria: "Software Creativo", 
        contratando: false, 
        icono: "🎨",
        descripcion: "🏢 ACERCA DE NOSOTROS: Adobe fue fundada por John Warnock y Charles Geschke en 1982. Somos líderes mundiales en software creativo y de marketing digital, con productos icónicos como Photoshop, Illustrator, Premiere Pro y Acrobat. Nuestra misión es cambiar el mundo a través de experiencias digitales personales y significativas. Creemos en la innovación, la creatividad y la inclusión. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral inspirador."
    },
    { 
        id: 12, 
        nombre: "Nvidia", 
        industria: "Semiconductores", 
        contratando: true, 
        icono: "💾",
        descripcion: "🏢 ACERCA DE NOSOTROS: Nvidia fue fundada por Jensen Huang, Chris Malachowsky y Curtis Priem en 1993. Somos pioneros en la computación acelerada y líderes mundiales en procesadores gráficos (GPU) e inteligencia artificial. Nuestra misión es resolver los problemas computacionales más complejos del mundo. Con más de 25,000 empleados, creemos en la innovación constante y el trabajo en equipo. Ofrecemos beneficios competitivos, opciones de acciones y la oportunidad de trabajar en tecnología de vanguardia."
    },
    { 
        id: 13, 
        nombre: "Spotify", 
        industria: "Música", 
        contratando: true, 
        icono: "🎵",
        descripcion: "🏢 ACERCA DE NOSOTROS: Spotify fue fundada por Daniel Ek y Martin Lorentzon en 2006 en Suecia. Somos la plataforma de audio en streaming más grande del mundo, con más de 600 millones de usuarios activos. Nuestra misión es desbloquear el potencial de la creatividad humana dando a los artistas la oportunidad de vivir de su arte. Creemos en la agilidad, la colaboración y la innovación constante. Ofrecemos beneficios como trabajo remoto, horarios flexibles y un ambiente laboral creativo."
    },
    { 
        id: 14, 
        nombre: "Uber", 
        industria: "Transporte", 
        contratando: true, 
        icono: "🚕",
        descripcion: "🏢 ACERCA DE NOSOTROS: Uber fue fundada por Garrett Camp y Travis Kalanick en 2009. Somos la plataforma líder mundial de movilidad y entrega, operando en más de 10,000 ciudades en 70 países. Nuestra misión es reimaginar la forma en que el mundo se mueve. Creemos en la innovación constante, la orientación al cliente y la responsabilidad. Ofrecemos beneficios competitivos, opciones de acciones y un ambiente laboral dinámico."
    },
    { 
        id: 15, 
        nombre: "Airbnb", 
        industria: "Turismo", 
        contratando: false, 
        icono: "🏠",
        descripcion: "🏢 ACERCA DE NOSOTROS: Airbnb fue fundada por Brian Chesky, Joe Gebbia y Nathan Blecharczyk en 2008. Somos la plataforma líder mundial de alojamiento y experiencias de viaje, con más de 7 millones de anuncios en 220 países. Nuestra misión es crear un mundo donde cualquiera pueda pertenecer a cualquier lugar. Creemos en la hospitalidad, la pertenencia y la comunidad. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral creativo."
    },
    { 
        id: 16, 
        nombre: "LinkedIn", 
        industria: "Redes Profesionales", 
        contratando: true, 
        icono: "💼",
        descripcion: "🏢 ACERCA DE NOSOTROS: LinkedIn fue fundada por Reid Hoffman en 2002 y es la red profesional más grande del mundo, con más de 1 billón de miembros en 200 países. Desde 2016, somos parte de Microsoft, pero operamos de manera independiente. Nuestra misión es conectar a los profesionales del mundo para que sean más productivos y exitosos. Creemos en la transparencia, la colaboración y el crecimiento profesional. Ofrecemos beneficios excepcionales, opciones de trabajo remoto y un ambiente laboral inclusivo."
    },
    { 
        id: 17, 
        nombre: "Twitter", 
        industria: "Redes Sociales", 
        contratando: true, 
        icono: "🐦",
        descripcion: "🏢 ACERCA DE NOSOTROS: Twitter fue fundada por Jack Dorsey, Noah Glass, Biz Stone y Evan Williams en 2006. Somos una de las plataformas de redes sociales más influyentes del mundo, donde las noticias y conversaciones suceden en tiempo real. Nuestra misión es servir al debate público sano. Creemos en la transparencia, la velocidad y la apertura. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral dinámico."
    },
    { 
        id: 18, 
        nombre: "Pinterest", 
        industria: "Redes Sociales", 
        contratando: false, 
        icono: "📌",
        descripcion: "🏢 ACERCA DE NOSOTROS: Pinterest fue fundada por Ben Silbermann, Paul Sciarra y Evan Sharp en 2010. Somos una plataforma de descubrimiento visual donde los usuarios encuentran ideas e inspiración para sus proyectos. Con más de 450 millones de usuarios activos mensuales, nuestra misión es ayudar a las personas a descubrir lo que aman e inspirarse para crear una vida que amen. Creemos en la positividad, la creatividad y la inclusión. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral inspirador."
    },
    { 
        id: 19, 
        nombre: "Snapchat", 
        industria: "Redes Sociales", 
        contratando: true, 
        icono: "👻",
        descripcion: "🏢 ACERCA DE NOSOTROS: Snap Inc., fundada por Evan Spiegel, Bobby Murphy y Reggie Brown en 2011, es la empresa detrás de Snapchat, la aplicación de mensajería visual que revolucionó la comunicación con fotos y videos efímeros. Nuestra misión es empoderar a las personas para que se expresen, vivan el momento, aprendan sobre el mundo y se diviertan juntos. Creemos en la creatividad, la innovación y la diversión. Ofrecemos beneficios competitivos, opciones de acciones y un ambiente laboral creativo."
    },
    { 
        id: 20, 
        nombre: "TikTok", 
        industria: "Redes Sociales", 
        contratando: true, 
        icono: "🎵",
        descripcion: "🏢 ACERCA DE NOSOTROS: TikTok fue lanzada por ByteDance en 2016 y se ha convertido en la plataforma de videos cortos más popular del mundo, con más de 1.5 mil millones de usuarios activos. Nuestra misión es inspirar la creatividad y traer alegría a las personas. Creemos en la diversión, la autenticidad y la comunidad global. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral dinámico."
    },
    { 
        id: 21, 
        nombre: "PayPal", 
        industria: "Fintech", 
        contratando: true, 
        icono: "💳",
        descripcion: "🏢 ACERCA DE NOSOTROS: PayPal fue fundada por Max Levchin, Peter Thiel y Elon Musk en 1998 como Confinity. Hoy somos el líder mundial en pagos digitales, operando en más de 200 mercados con más de 400 millones de cuentas activas. Nuestra misión es democratizar los servicios financieros para empoderar a personas y empresas en la economía global. Creemos en la seguridad, la innovación y la inclusión financiera. Ofrecemos beneficios competitivos, opciones de acciones y un ambiente laboral inclusivo."
    },
    { 
        id: 22, 
        nombre: "Stripe", 
        industria: "Fintech", 
        contratando: true, 
        icono: "⚡",
        descripcion: "🏢 ACERCA DE NOSOTROS: Stripe fue fundada por Patrick y John Collison en 2010. Somos la infraestructura de pagos en línea líder para empresas de internet, procesando miles de millones de dólares anualmente para compañías como Amazon, Shopify, Zoom y Salesforce. Nuestra misión es aumentar el PIB de internet. Creemos en la simplicidad, la transparencia y la innovación. Ofrecemos salarios competitivos, opciones de acciones y un ambiente laboral de alta tecnología."
    },
    { 
        id: 23, 
        nombre: "Shopify", 
        industria: "E-commerce", 
        contratando: false, 
        icono: "🛒",
        descripcion: "🏢 ACERCA DE NOSOTROS: Shopify fue fundada por Tobias Lütke, Daniel Weinand y Scott Lake en 2006. Somos la plataforma de comercio electrónico líder mundial, empoderando a más de 4 millones de negocios en 175 países. Nuestra misión es hacer que el comercio sea mejor para todos. Creemos en la independencia, la innovación y la confianza. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral emprendedor."
    },
    { 
        id: 24, 
        nombre: "Zoom", 
        industria: "Comunicaciones", 
        contratando: true, 
        icono: "📹",
        descripcion: "🏢 ACERCA DE NOSOTROS: Zoom Video Communications fue fundada por Eric Yuan en 2011. Somos el líder mundial en comunicaciones unificadas, con millones de usuarios diarios que confían en nuestra plataforma para videoconferencias, reuniones virtuales y colaboración remota. Nuestra misión es hacer que las comunicaciones en video sean fáciles, confiables y accesibles para todos. Creemos en la felicidad, la innovación y el cuidado. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral positivo."
    },
    { 
        id: 25, 
        nombre: "Slack", 
        industria: "Comunicaciones", 
        contratando: true, 
        icono: "💬",
        descripcion: "🏢 ACERCA DE NOSOTROS: Slack fue fundada por Stewart Butterfield, Eric Costello, Cal Henderson y Serguei Mourachov en 2013. Somos la plataforma de colaboración empresarial líder, utilizada por más de 750,000 organizaciones en todo el mundo. Desde 2021, somos parte de Salesforce, pero operamos de manera independiente. Nuestra misión es hacer la vida laboral más sencilla, más agradable y más productiva. Creemos en la empatía, la artesanía y la colaboración. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral inclusivo."
    },
    { 
        id: 26, 
        nombre: "Dropbox", 
        industria: "Almacenamiento", 
        contratando: false, 
        icono: "📁",
        descripcion: "🏢 ACERCA DE NOSOTROS: Dropbox fue fundada por Drew Houston y Arash Ferdowsi en 2007. Somos el líder mundial en almacenamiento en la nube y colaboración de archivos, con más de 700 millones de usuarios registrados. Nuestra misión es liberar el potencial creativo de las personas al mantener sus archivos seguros, sincronizados y accesibles desde cualquier lugar. Creemos en la simplicidad, la seguridad y la innovación. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral centrado en el bienestar."
    },
    { 
        id: 27, 
        nombre: "Intel", 
        industria: "Semiconductores", 
        contratando: true, 
        icono: "🔲",
        descripcion: "🏢 ACERCA DE NOSOTROS: Intel fue fundada por Robert Noyce y Gordon Moore en 1968 (cofundador de Fairchild Semiconductor). Somos el fabricante líder mundial de semiconductores, creando procesadores que impulsan la mayoría de las computadoras y servidores del mundo. Con más de 120,000 empleados, nuestra misión es crear tecnología que cambie el mundo. Creemos en la innovación, la excelencia técnica y la responsabilidad. Ofrecemos beneficios competitivos, opciones de acciones y un ambiente laboral de alta tecnología."
    },
    { 
        id: 28, 
        nombre: "Cisco", 
        industria: "Redes", 
        contratando: true, 
        icono: "🌍",
        descripcion: "🏢 ACERCA DE NOSOTROS: Cisco Systems fue fundada por Leonard Bosack y Sandy Lerner en 1984. Somos el líder mundial en infraestructura de redes, conectando personas, dispositivos y datos en todo el mundo. Nuestra misión es dar forma al futuro de internet creando experiencias digitales inclusivas que empoderen a las personas. Creemos en la innovación, la colaboración y la responsabilidad social. Ofrecemos beneficios competitivos, opciones de trabajo remoto y un ambiente laboral inclusivo."
    },
    { 
        id: 29, 
        nombre: "Qualcomm", 
        industria: "Semiconductores", 
        contratando: true, 
        icono: "📡",
        descripcion: "🏢 ACERCA DE NOSOTROS: Qualcomm fue fundada por Irwin Jacobs y Andrew Viterbi en 1985. Somos líderes mundiales en tecnología 5G, procesadores móviles (Snapdragon) y soluciones de conectividad inalámbrica. Nuestra misión es inventar tecnologías móviles innovadoras para conectar a las personas con todo lo que les importa. Creemos en la innovación, la colaboración y la excelencia técnica. Ofrecemos beneficios competitivos, opciones de acciones y un ambiente laboral de alta tecnología."
    },
    { 
        id: 30, 
        nombre: "AMD", 
        industria: "Semiconductores", 
        contratando: true, 
        icono: "⚙️",
        descripcion: "🏢 ACERCA DE NOSOTROS: Advanced Micro Devices (AMD) fue fundada por Jerry Sanders en 1969. Somos líderes mundiales en procesadores de alto rendimiento (Ryzen, EPYC) y tarjetas gráficas (Radeon), compitiendo directamente con Intel y Nvidia. Nuestra misión es construir productos de alto rendimiento y adaptabilidad que aceleren la próxima generación de experiencias informáticas. Creemos en la innovación, la colaboración y la excelencia técnica. Ofrecemos beneficios competitivos, opciones de acciones y un ambiente laboral de alta tecnología."
    }];

        // Elementos del DOM para contacto
        const departamentoSelect = document.getElementById('departamento');
        const provinciaSelect = document.getElementById('provincia');
        const distritoSelect = document.getElementById('distrito');
        const profesionSelect = document.getElementById('profesion');
        const otherProfessionDiv = document.getElementById('otherProfession');
        const otraProfesionInput = document.getElementById('otraProfesion');

        // Función para calcular edad
        function calcularEdad(fechaNacimiento) {
            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            return edad;
        }

        // Cargar provincias según departamento
        if (departamentoSelect) {
            departamentoSelect.addEventListener('change', function() {
                const depto = this.value;
                provinciaSelect.innerHTML = '<option value="">Seleccionar provincia</option>';
                distritoSelect.innerHTML = '<option value="">Primero selecciona una provincia</option>';
                
                if (depto && ubicaciones[depto]) {
                    ubicaciones[depto].provincias.forEach(prov => {
                        const option = document.createElement('option');
                        option.value = prov;
                        option.textContent = prov;
                        provinciaSelect.appendChild(option);
                    });
                }
            });
        }

        // Cargar distritos según provincia
        if (provinciaSelect) {
            provinciaSelect.addEventListener('change', function() {
                const depto = departamentoSelect.value;
                const provincia = this.value;
                distritoSelect.innerHTML = '<option value="">Seleccionar distrito</option>';
                
                if (depto && provincia && ubicaciones[depto] && ubicaciones[depto].distritos[provincia]) {
                    ubicaciones[depto].distritos[provincia].forEach(dist => {
                        const option = document.createElement('option');
                        option.value = dist;
                        option.textContent = dist;
                        distritoSelect.appendChild(option);
                    });
                }
            });
        }

        // Mostrar campo OTRA PROFESIÓN
        if (profesionSelect) {
            profesionSelect.addEventListener('change', function() {
                if (this.value === 'OTRO') {
                    otherProfessionDiv.classList.add('active');
                    otraProfesionInput.setAttribute('required', 'required');
                } else {
                    otherProfessionDiv.classList.remove('active');
                    otraProfesionInput.removeAttribute('required');
                    otraProfesionInput.value = '';
                }
            });
        }

        // Manejar envío del formulario de contacto
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nombre = document.getElementById('nombre').value;
                const fechaNacimiento = document.getElementById('fechaNacimiento').value;
                const departamento = document.getElementById('departamento').value;
                const provincia = document.getElementById('provincia').value;
                const distrito = document.getElementById('distrito').value;
                const direccion = document.getElementById('direccion').value;
                let profesion = document.getElementById('profesion').value;
                const gradoAcademico = document.getElementById('gradoAcademico').value;
                const disponibilidad = document.getElementById('disponibilidad').value;
                
                if (!nombre || !fechaNacimiento || !departamento || !provincia || !distrito || !direccion || !profesion || !gradoAcademico || !disponibilidad) {
                    alert('Por favor, completa todos los campos obligatorios.');
                    return;
                }
                
                if (profesion === 'OTRO') {
                    if (!otraProfesionInput.value) {
                        alert('Por favor, escribe tu profesión en el campo correspondiente.');
                        return;
                    }
                    profesion = otraProfesionInput.value;
                }
                
                const edad = calcularEdad(fechaNacimiento);
                const mensaje = `Hola, me llamo ${nombre}, resido en ${departamento}, ${provincia}, ${distrito}, tengo ${edad} años de edad, soy de profesion ${profesion} con grado académico de ${gradoAcademico}. Me gustaría contar con un CV online para mejorar mi perfil.`;
                const mensajeCodificado = encodeURIComponent(mensaje);
                const numeroWhatsApp = '51999999999';
                window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');
            });
        }

        // Función scroll to contacto
        function scrollToContacto() {
            const contacto = document.getElementById('contact-section');
            if (contacto) {
                contacto.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            document.getElementById('navInicio').classList.remove('active');
            document.getElementById('navProfesionales').classList.remove('active');
            document.getElementById('navEmpresas').classList.remove('active');
        }

        // Funciones de renderizado de empresas y profesionales (mantener igual)
        function renderBrands() {
            const brandsGrid = document.getElementById('brandsGrid');
            if (!brandsGrid) return;
            brandsGrid.innerHTML = '';
            empresasData.forEach(empresa => {
                const brandCard = document.createElement('div');
                brandCard.className = 'brand-card';
                brandCard.innerHTML = `<div class="brand-icon">${empresa.icono}</div><div class="brand-name">${empresa.nombre}</div><div class="brand-industry">${empresa.industria}</div>`;
                brandCard.addEventListener('click', () => expandBrand(empresa.id));
                brandsGrid.appendChild(brandCard);
            });
        }

        function expandBrand(id) {
            const empresa = empresasData.find(e => e.id === id);
            if (!empresa) return;
            const expandedContent = document.getElementById('expandedContent');
            if (!expandedContent) return;
            expandedContent.innerHTML = `
                <div class="expanded-header">
                    <div class="expanded-icon">${empresa.icono}</div>
                    <div class="expanded-title"><h3>${empresa.nombre}</h3><p>${empresa.industria}</p></div>
                </div>
                <div class="info-card">
                    <div class="info-card-title"><span>🏢</span> Acerca de Nosotros</div>
                    <div class="info-card-content"><p>${empresa.descripcion}</p></div>
                </div>
                <div class="info-card">
                    <div class="info-card-title"><span>🎯</span> Áreas Prioritarias</div>
                    <div class="info-card-content">
                        <p>Actualmente, ${empresa.nombre} busca profesionales en las siguientes áreas:</p>
                        <div class="priority-tags">
                            <span class="priority-tag">Inteligencia Artificial</span>
                            <span class="priority-tag">Desarrollo de Software</span>
                            <span class="priority-tag">Ciberseguridad</span>
                            <span class="priority-tag">Ciencia de Datos</span>
                            <span class="priority-tag">Experiencia de Usuario (UX/UI)</span>
                            <span class="priority-tag">Cloud Computing</span>
                        </div>
                    </div>
                </div>
                <div class="info-card">
                    <div class="info-card-title"><span>📝</span> Descripción</div>
                    <div class="info-card-content"><p>En ${empresa.nombre}, valoramos la innovación, la creatividad y el trabajo en equipo. Buscamos personas apasionadas por la tecnología que quieran marcar la diferencia en el mundo. Ofrecemos un ambiente laboral inclusivo, oportunidades de crecimiento profesional y beneficios competitivos.</p></div>
                </div>
                <div class="hiring-status ${empresa.contratando ? 'hiring-yes' : 'hiring-no'}">${empresa.contratando ? '✅ Actualmente en búsqueda de personal' : '❌ No estamos reclutando en este momento'}</div>
                <button class="btn-select" style="margin-top:1rem" onclick="window.location.href='#contact-section'">📩 Contactar para más información</button>
            `;
            document.getElementById('brandExpanded').classList.add('active');
            document.getElementById('brandExpanded').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Elementos del DOM
        const professionsList = document.getElementById('professionsList');
        const cvsGrid = document.getElementById('cvsGrid');
        const loading = document.getElementById('loading');
        const modal = document.getElementById('cvModal');
        const modalContent = document.getElementById('modalContent');
        const closeModal = document.getElementById('closeModal');
        const searchInput = document.getElementById('professionSearch');
        const paginationContainer = document.getElementById('paginationContainer');
        const mainContainer1 = document.getElementById('mainContainer1');
        const mainContainer2 = document.getElementById('mainContainer2');
        const mainContainer3 = document.getElementById('mainContainer3');
        const splitContainer = document.getElementById('splitContainer');
        const profesionalSide = document.getElementById('profesionalSide');
        const empresaSide = document.getElementById('empresaSide');
        const btnProfesional = document.getElementById('btnProfesional');
        const btnEmpresa = document.getElementById('btnEmpresa');
        const closeExpanded = document.getElementById('closeExpanded');

        let profesionales = [], profesionalesFiltrados = [], profesionesUnicas = [];
        let currentPage = 1, totalPages = 1, fragmentoPendiente = null, datosCargados = false;

        function mostrarInicio() { window.scrollTo({ top: 0, behavior: 'smooth' });mainContainer1.classList.remove('hidden-div'); mainContainer2.classList.add('hidden-div'); mainContainer3.classList.add('hidden-div'); updateActiveNav('navInicio'); window.location.hash = ''; document.getElementById('brandExpanded').classList.remove('active'); }
        function mostrarProfesionales() { window.scrollTo({ top: 0, behavior: 'smooth' });mainContainer1.classList.add('hidden-div'); mainContainer2.classList.remove('hidden-div'); mainContainer3.classList.add('hidden-div'); updateActiveNav('navProfesionales'); window.location.hash = ''; }
        function mostrarEmpresas() { window.scrollTo({ top: 0, behavior: 'smooth' });mainContainer1.classList.add('hidden-div'); mainContainer2.classList.add('hidden-div'); mainContainer3.classList.remove('hidden-div'); updateActiveNav('navEmpresas'); window.location.hash = ''; }
        function updateActiveNav(activeId) { document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active')); document.getElementById(activeId).classList.add('active'); }
        function redirectTo(target) { target === 'profesional' ? mostrarProfesionales() : mostrarEmpresas(); }
        function expandAndRedirect(side) {
            if (side === 'profesional') { splitContainer.classList.add('expanded-left'); splitContainer.classList.remove('expanded-right'); setTimeout(() => { redirectTo('profesional'); setTimeout(() => splitContainer.classList.remove('expanded-left'), 500); }, 800); }
            else { splitContainer.classList.add('expanded-right'); splitContainer.classList.remove('expanded-left'); setTimeout(() => { redirectTo('empresa'); setTimeout(() => splitContainer.classList.remove('expanded-right'), 500); }, 800); }
        }
        btnProfesional.addEventListener('click', (e) => { e.stopPropagation(); expandAndRedirect('profesional'); });
        btnEmpresa.addEventListener('click', (e) => { e.stopPropagation(); expandAndRedirect('empresa'); });
        profesionalSide.addEventListener('click', (e) => { if (e.target === btnProfesional || btnProfesional.contains(e.target)) return; expandAndRedirect('profesional'); });
        empresaSide.addEventListener('click', (e) => { if (e.target === btnEmpresa || btnEmpresa.contains(e.target)) return; expandAndRedirect('empresa'); });
        window.mostrarInicio = mostrarInicio; window.mostrarProfesionales = mostrarProfesionales; window.mostrarEmpresas = mostrarEmpresas;

        function generarUrlProfesional(profesional) { return `${BASE_URL}/#${profesional.idUnico}`; }
        function abrirModalPorId(idBuscado) {
            const profesional = profesionales.find(p => p.idUnico === idBuscado);
            if (profesional) {
                const todoItem = document.querySelector('[data-profession="todos"]');
                if (todoItem && !todoItem.classList.contains('active')) todoItem.click();
                setTimeout(() => {
                    const indexEnProfesionales = profesionalesFiltrados.findIndex(p => p.idUnico === idBuscado);
                    if (indexEnProfesionales !== -1) {
                        const paginaProfesional = Math.floor(indexEnProfesionales / ITEMS_PER_PAGE) + 1;
                        if (paginaProfesional !== currentPage) { currentPage = paginaProfesional; renderCurrentPage(); renderPagination(); setTimeout(() => openModal(profesional.id), 300); }
                        else openModal(profesional.id);
                    } else openModal(profesional.id);
                }, 100);
            } else mostrarNotificacionError(idBuscado);
        }
        function verificarFragmentoInicial() { const hash = window.location.hash.substring(1); if (hash && hash.length > 0) { if (datosCargados && profesionales.length > 0) { mostrarProfesionales(); setTimeout(() => abrirModalPorId(hash), 500); } else fragmentoPendiente = hash; } }
        function mostrarNotificacionError(idBuscado) { const toast = document.createElement('div'); toast.className = 'not-found-toast'; toast.innerHTML = `<span>⚠️</span><div><strong>ID no encontrado</strong><p>El identificador "${idBuscado}" no corresponde a ningún profesional.</p></div>`; document.body.appendChild(toast); setTimeout(() => toast.remove(), 5000); }

        async function loadDataFromSheet() {
            try {
                loading.style.display = 'block'; cvsGrid.style.display = 'none'; paginationContainer.style.display = 'none';
                const response = await fetch(SHEET_CSV_URL);
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                const csvText = await response.text();
                profesionales = parseCSVToObjects(csvText);
                if (profesionales.length === 0) throw new Error('No se encontraron datos válidos en la hoja');
                profesionales.forEach(prof => { prof.urlCompleta = generarUrlProfesional(prof); });
                profesionalesFiltrados = [...profesionales];
                totalPages = Math.ceil(profesionalesFiltrados.length / ITEMS_PER_PAGE);
                currentPage = 1;
                profesionesUnicas = [...new Set(profesionales.map(p => p.profesion).filter(Boolean))];
                renderProfessions(); renderCurrentPage(); renderPagination();
                loading.style.display = 'none'; cvsGrid.style.display = 'grid'; paginationContainer.style.display = 'flex';
                datosCargados = true;
                if (fragmentoPendiente) { mostrarProfesionales(); setTimeout(() => abrirModalPorId(fragmentoPendiente), 500); fragmentoPendiente = null; }
                else verificarFragmentoInicial();
            } catch (error) { console.error(error); loading.innerHTML = `Error al cargar los datos: ${error.message}`; }
        }

        function parseCSVToObjects(csvText) {
            const lines = csvText.split('\n').filter(line => line.trim() !== '');
            if (lines.length < 3) return [];
            const headers = parseCSVLine(lines[0]);
            const idUnicoIndex = headers.findIndex(h => h.trim().toUpperCase() === 'ID_UNICO');
            const vacioIndex = headers.findIndex(h => h.trim().toUpperCase() === 'VACIO');
            if (idUnicoIndex === -1 || vacioIndex === -1) return [];
            const indices = { id: headers.indexOf('id'), nombre: headers.indexOf('nombre'), profesion: headers.indexOf('profesion'), edad: headers.indexOf('edad'), ubicacion: headers.indexOf('ubicacion'), imagen: headers.indexOf('imagen'), formacionAcademica: headers.indexOf('formacionAcademica'), nivelEducacion: headers.indexOf('nivelEducacion'), experienciaLaboral: headers.indexOf('experienciaLaboral'), resumen: headers.indexOf('resumen'), celular: headers.indexOf('celular'), facebook: headers.indexOf('facebook'), instagram: headers.indexOf('instagram'), linkedin: headers.indexOf('linkedin'), correo: headers.indexOf('correo'), idiomas: headers.indexOf('idiomas'), habilidades: headers.indexOf('habilidades') };
            const expIndices = []; for (let j = 1; j <= 5; j++) expIndices.push({ empresa: headers.indexOf(`empresa${j}`), tiempo: headers.indexOf(`tiempo${j}`), puesto: headers.indexOf(`puesto${j}`) });
            const objects = [];
            for (let i = 2; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);
                if (values.length <= Math.max(idUnicoIndex, vacioIndex)) continue;
                if (cleanValue(values[vacioIndex]) !== 'VACIO') continue;
                const idUnico = cleanValue(values[idUnicoIndex]);
                if (!idUnico || idUnico.length !== 10 || isNaN(idUnico)) continue;
                const obj = { id: i - 1, idUnico: idUnico, nombre: indices.nombre !== -1 ? cleanValue(values[indices.nombre]) : '', profesion: indices.profesion !== -1 ? cleanValue(values[indices.profesion]) : '', edad: indices.edad !== -1 ? parseInt(cleanValue(values[indices.edad])) || 0 : 0, ubicacion: indices.ubicacion !== -1 ? cleanValue(values[indices.ubicacion]) : '', imagen: indices.imagen !== -1 ? cleanValue(values[indices.imagen]) : '', formacionAcademica: indices.formacionAcademica !== -1 ? cleanValue(values[indices.formacionAcademica]) : '', nivelEducacion: indices.nivelEducacion !== -1 ? cleanValue(values[indices.nivelEducacion]) : '', experienciaLaboral: indices.experienciaLaboral !== -1 ? cleanValue(values[indices.experienciaLaboral]) : '', resumen: indices.resumen !== -1 ? cleanValue(values[indices.resumen]) : '', celular: indices.celular !== -1 ? cleanValue(values[indices.celular]) : '', facebook: indices.facebook !== -1 ? cleanValue(values[indices.facebook]) : '', instagram: indices.instagram !== -1 ? cleanValue(values[indices.instagram]) : '', linkedin: indices.linkedin !== -1 ? cleanValue(values[indices.linkedin]) : '', correo: indices.correo !== -1 ? cleanValue(values[indices.correo]) : '' };
                if (indices.idiomas !== -1 && values[indices.idiomas]) obj.idiomasArray = cleanValue(values[indices.idiomas]).split(',').map(i => i.trim()).filter(i => i);
                else obj.idiomasArray = [];
                if (indices.habilidades !== -1 && values[indices.habilidades]) obj.habilidadesArray = cleanValue(values[indices.habilidades]).split(',').map(h => h.trim()).filter(h => h);
                else obj.habilidadesArray = [];
                obj.experiencias = [];
                for (let j = 0; j < expIndices.length; j++) { const expIdx = expIndices[j]; if (expIdx.empresa !== -1 && values[expIdx.empresa]) { const empresa = cleanValue(values[expIdx.empresa]); if (empresa) obj.experiencias.push({ empresa: empresa, tiempo: expIdx.tiempo !== -1 ? cleanValue(values[expIdx.tiempo]) : 'No especificado', puesto: expIdx.puesto !== -1 ? cleanValue(values[expIdx.puesto]) : 'No especificado' }); } }
                if (obj.nombre) objects.push(obj);
            }
            return objects;
        }

        function cleanValue(value) { return value ? value.replace(/^"|"$/g, '').trim() : ''; }
        function parseCSVLine(line) { const result = []; let current = '', inQuotes = false; for (let i = 0; i < line.length; i++) { const char = line[i]; if (char === '"') inQuotes = !inQuotes; else if (char === ',' && !inQuotes) { result.push(current); current = ''; } else current += char; } result.push(current); return result; }
        function renderProfessions() { professionsList.innerHTML = '<li class="active" data-profession="todos">✨ Todos los profesionales</li>'; profesionesUnicas.sort().forEach(prof => { if (prof) professionsList.innerHTML += `<li data-profession="${prof}">${prof}</li>`; }); document.querySelectorAll('.professions-list li').forEach(item => { item.addEventListener('click', function () { document.querySelectorAll('.professions-list li').forEach(li => li.classList.remove('active')); this.classList.add('active'); filterCVs(this.dataset.profession); searchInput.value = ''; document.querySelectorAll('.professions-list li').forEach(li => li.classList.remove('hidden')); }); }); }
        function filterCVs(profesion) { profesionalesFiltrados = profesion === 'todos' ? [...profesionales] : profesionales.filter(p => p.profesion === profesion); currentPage = 1; totalPages = Math.ceil(profesionalesFiltrados.length / ITEMS_PER_PAGE); renderCurrentPage(); renderPagination(); }
        function renderCurrentPage() { const start = (currentPage - 1) * ITEMS_PER_PAGE; renderCVs(profesionalesFiltrados.slice(start, start + ITEMS_PER_PAGE)); }
        function renderCVs(cvs) { cvsGrid.innerHTML = ''; if (cvs.length === 0) { cvsGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #64748b;">No se encontraron profesionales</div>'; return; } cvs.forEach(cv => { const card = document.createElement('div'); card.className = 'cv-card'; card.innerHTML = `<div class="cv-card-header"><div class="cv-card-image-col"><img class="cv-card-image" src="${cv.imagen || 'https://via.placeholder.com/80'}" alt="${cv.nombre}" onerror="this.src='https://via.placeholder.com/80'"></div><div class="cv-card-info-col"><div class="cv-card-name">${cv.nombre || 'Nombre no disponible'}</div><div class="cv-card-profession">${cv.profesion || 'Profesión no especificada'}</div><div class="cv-card-age">${cv.edad || '?'} años</div></div></div><div class="cv-card-body"><div class="cv-card-section"><div class="cv-card-section-title">NIVEL DE EDUCACIÓN</div><div class="cv-card-section-content">${cv.nivelEducacion || 'No especificado'}</div></div><div class="cv-card-section"><div class="cv-card-section-title">FORMACIÓN ACADÉMICA</div><div class="cv-card-section-content">${cv.formacionAcademica || 'No especificado'}</div></div><div class="cv-card-section"><div class="cv-card-section-title">EXPERIENCIA LABORAL</div><div class="cv-card-section-content">${cv.experienciaLaboral || 'No especificado'}</div></div></div><div class="cv-card-footer"><div class="cv-card-location">📍 ${cv.ubicacion || 'Ubicación no especificada'}</div><div class="cv-card-badge">Ver CV</div></div>`; card.addEventListener('click', () => openModal(cv.id)); cvsGrid.appendChild(card); }); }
        function renderPagination() { if (totalPages <= 1) { paginationContainer.innerHTML = ''; return; } let html = ''; html += `<button class="pagination-button" onclick="goToPage(1)" ${currentPage === 1 ? 'disabled' : ''}>⏮️</button><button class="pagination-button" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>◀️</button>`; let start = Math.max(1, currentPage - 2), end = Math.min(totalPages, start + 4); if (end - start + 1 < 5) start = Math.max(1, end - 4); if (start > 1) { html += `<button class="pagination-button" onclick="goToPage(1)">1</button>`; if (start > 2) html += `<span class="pagination-ellipsis">...</span>`; } for (let i = start; i <= end; i++) html += `<button class="pagination-button ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`; if (end < totalPages) { if (end < totalPages - 1) html += `<span class="pagination-ellipsis">...</span>`; html += `<button class="pagination-button" onclick="goToPage(${totalPages})">${totalPages}</button>`; } html += `<button class="pagination-button" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>▶️</button><button class="pagination-button" onclick="goToPage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>⏭️</button>`; paginationContainer.innerHTML = html; }
        window.goToPage = function (page) { if (page < 1 || page > totalPages || page === currentPage) return; currentPage = page; renderCurrentPage(); renderPagination(); cvsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        function formatPhone(phone) { if (!phone) return 'No especificado'; const digits = phone.replace(/\D/g, ''); if (digits.length === 11) return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3'); return digits; }
        function openModal(id) { const profesional = profesionales.find(p => p.id == id); if (!profesional) return; if (!profesional.urlCompleta) profesional.urlCompleta = generarUrlProfesional(profesional); const experienciasHTML = profesional.experiencias?.length ? profesional.experiencias.map(exp => `<div class="experience-item"><div class="experience-company">🏢 ${exp.empresa}</div><div class="experience-position">👔 ${exp.puesto}</div><div class="experience-duration">⏱️ ${exp.tiempo}</div></div>`).join('') : '<p>No hay experiencia laboral registrada</p>'; const habilidadesList = profesional.habilidadesArray?.length ? profesional.habilidadesArray.map(h => `<li>${h}</li>`).join('') : '<li>No especificado</li>'; const idiomasList = profesional.idiomasArray?.length ? profesional.idiomasArray.map(i => `<li>${i}</li>`).join('') : '<li>No especificado</li>'; modalContent.innerHTML = `<div class="modal-cv"><div class="modal-left"><img src="${profesional.imagen || 'https://via.placeholder.com/280'}" alt="${profesional.nombre}" onerror="this.src='https://via.placeholder.com/280'"><h2>${profesional.nombre}</h2><p style="color:#3b82f6;font-weight:600">${profesional.profesion}</p><p>🎂 ${profesional.edad} años</p><p>📍 ${profesional.ubicacion}</p><div class="contact-info"><div class="contact-item"><span class="contact-icon">📱</span><span class="contact-text">${formatPhone(profesional.celular)}</span></div><div class="contact-item"><span class="contact-icon">📧</span><span class="contact-text">${profesional.correo || 'No especificado'}</span></div>${profesional.facebook ? `<div class="contact-item"><span class="contact-icon">👤</span><span class="contact-text"><a href="${profesional.facebook}" target="_blank">Facebook</a></span></div>` : ''}${profesional.instagram ? `<div class="contact-item"><span class="contact-icon">📷</span><span class="contact-text"><a href="${profesional.instagram}" target="_blank">Instagram</a></span></div>` : ''}${profesional.linkedin ? `<div class="contact-item"><span class="contact-icon">💼</span><span class="contact-text"><a href="${profesional.linkedin}" target="_blank">LinkedIn</a></span></div>` : ''}</div><div style="margin-top:1rem;padding:1rem;background:#eff6ff;border-radius:12px"><p style="font-size:0.85rem;font-weight:600">🔑 ID ÚNICO:</p><div style="display:flex;justify-content:center"><span style="font-size:1.2rem;font-weight:700;color:#3b82f6;background:white;padding:0.5rem 1.5rem;border-radius:30px;border:2px solid #3b82f6">${profesional.idUnico}</span></div></div><div style="margin-top:1rem;padding:1rem;background:#eff6ff;border-radius:12px"><p style="font-size:0.85rem;font-weight:600">🔗 URL con identificador:</p><a href="${profesional.urlCompleta}" target="_blank" style="color:#3b82f6;word-break:break-all">${profesional.urlCompleta}</a></div></div><div class="modal-right"><h2>Curriculum Vitae</h2><h3>📚 Formación Académica</h3><p>${profesional.formacionAcademica || 'No especificado'}</p><h3>🎓 Nivel de Educación</h3><p>${profesional.nivelEducacion || 'No especificado'}</p><h3>💼 Experiencia Laboral Detallada (Últimos 5 empleos)</h3>${experienciasHTML}<h3>⭐ Perfil Profesional</h3><p>${profesional.resumen || 'No especificado'}</p><h3>🚀 Habilidades</h3><ul>${habilidadesList}</ul><h3>🌍 Idiomas</h3><ul>${idiomasList}</ul></div></div>`; modal.style.display = "block"; document.body.style.overflow = "hidden"; }
        function searchProfessions() { const term = searchInput.value.toLowerCase().trim(); document.querySelectorAll('.professions-list li').forEach(item => { item.classList.toggle('hidden', !(term === '' || item.textContent.toLowerCase().includes(term))); }); }

        searchInput.addEventListener('input', searchProfessions);
        closeModal.addEventListener('click', () => { modal.style.display = "none"; document.body.style.overflow = "auto"; });
        window.addEventListener('click', (e) => { if (e.target === modal) { modal.style.display = "none"; document.body.style.overflow = "auto"; } });
        window.addEventListener('hashchange', function () { const hash = window.location.hash.substring(1); if (hash && /^\d{10}$/.test(hash) && datosCargados) { mostrarProfesionales(); setTimeout(() => abrirModalPorId(hash), 300); } });
        closeExpanded.addEventListener('click', () => { document.getElementById('brandExpanded').classList.remove('active'); });

        renderBrands();
        loadDataFromSheet();
