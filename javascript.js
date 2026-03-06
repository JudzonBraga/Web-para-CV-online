// ===== CONFIGURACIÓN =====
        const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRR28qxQ7e-0D2BXZeEieWq8oKZ3mrsd5e4ovivQfXrpvG2cs3jkSEF2_5NNVSL3aWbU2oGzDao40FR/pub?output=csv';
        const ITEMS_PER_PAGE = 12;
        const BASE_URL = 'https://judzonbraga.github.io/PAGINAWEB5/';

        // Elementos del DOM
        const professionsList = document.getElementById('professionsList');
        const cvsGrid = document.getElementById('cvsGrid');
        const loading = document.getElementById('loading');
        const modal = document.getElementById('cvModal');
        const modalContent = document.getElementById('modalContent');
        const closeModal = document.getElementById('closeModal');
        const searchInput = document.getElementById('professionSearch');
        const paginationContainer = document.getElementById('paginationContainer');

        // Variables globales
        let profesionales = [];
        let profesionalesFiltrados = [];
        let profesionesUnicas = [];
        let currentPage = 1;
        let totalPages = 1;
        let fragmentoPendiente = null;
        let datosCargados = false;

        // Slideshow automático
        let slideIndex = 0;
        function showSlides() {
            const slides = document.getElementsByClassName("slide");
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active-slide");
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            slides[slideIndex-1].classList.add("active-slide");
            setTimeout(showSlides, 5000);
        }
        showSlides();

        // ===== FUNCIÓN PARA GENERAR URL CON ID_UNICO DE GOOGLE SHEETS =====
        function generarUrlProfesional(profesional) {
            return `${BASE_URL}#${profesional.idUnico}`;
        }

        // ===== FUNCIÓN PARA ABRIR MODAL POR ID =====
        function abrirModalPorId(idBuscado) {
            console.log(`🔍 Buscando profesional con ID: ${idBuscado}`);
            
            const profesional = profesionales.find(p => p.idUnico === idBuscado);
            
            if (profesional) {
                console.log(`✅ Profesional encontrado: ${profesional.nombre}`);
                
                // Cambiar a "Todos los profesionales" para asegurar visibilidad
                const todoItem = document.querySelector('[data-profession="todos"]');
                if (todoItem && !todoItem.classList.contains('active')) {
                    todoItem.click();
                }
                
                // Pequeña pausa para que se actualice el filtro
                setTimeout(() => {
                    // Calcular la página donde está el profesional
                    const indexEnProfesionales = profesionalesFiltrados.findIndex(p => p.idUnico === idBuscado);
                    
                    if (indexEnProfesionales !== -1) {
                        const paginaProfesional = Math.floor(indexEnProfesionales / ITEMS_PER_PAGE) + 1;
                        
                        // Si no está en la página actual, navegar
                        if (paginaProfesional !== currentPage) {
                            console.log(`📄 Navegando a página ${paginaProfesional}`);
                            currentPage = paginaProfesional;
                            renderCurrentPage();
                            renderPagination();
                            
                            // Esperar a que se renderice la página y abrir modal
                            setTimeout(() => {
                                console.log(`📂 Abriendo modal para: ${profesional.nombre}`);
                                openModal(profesional.id);
                            }, 300);
                        } else {
                            // Ya está en la página correcta, abrir modal directamente
                            console.log(`📂 Abriendo modal para: ${profesional.nombre}`);
                            openModal(profesional.id);
                        }
                    } else {
                        // Si no está en filtrados (puede pasar si hay filtro activo), abrir directamente
                        console.log(`📂 Abriendo modal directamente para: ${profesional.nombre}`);
                        openModal(profesional.id);
                    }
                }, 100);
            } else {
                console.warn(`❌ No se encontró profesional con ID: ${idBuscado}`);
                mostrarNotificacionError(idBuscado);
            }
        }

        // ===== FUNCIÓN PARA VERIFICAR FRAGMENTO =====
        function verificarFragmentoInicial() {
            const hash = window.location.hash.substring(1);
            
            if (hash && hash.length > 0) {
                console.log('🔍 Fragmento detectado en URL:', hash);
                
                if (datosCargados && profesionales.length > 0) {
                    // Datos ya cargados, abrir directamente
                    abrirModalPorId(hash);
                } else {
                    // Datos no cargados, guardar para después
                    console.log('⏳ Datos aún no cargados, guardando fragmento para después');
                    fragmentoPendiente = hash;
                }
            }
        }

        // ===== FUNCIÓN PARA MOSTRAR NOTIFICACIÓN DE ERROR =====
        function mostrarNotificacionError(idBuscado) {
            const toast = document.createElement('div');
            toast.className = 'not-found-toast';
            toast.innerHTML = `
                <span style="font-size: 1.2rem;">⚠️</span>
                <div>
                    <strong>ID no encontrado</strong>
                    <p style="font-size: 0.85rem; margin-top: 0.2rem;">El identificador "${idBuscado}" no corresponde a ningún profesional.</p>
                </div>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 5000);
        }

        // ===== FUNCIÓN PRINCIPAL: Cargar datos desde Google Sheets =====
        async function loadDataFromSheet() {
            try {
                loading.style.display = 'block';
                cvsGrid.style.display = 'none';
                paginationContainer.style.display = 'none';
                
                console.log('📥 Cargando datos desde Google Sheets...');
                
                const response = await fetch(SHEET_CSV_URL);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                
                const csvText = await response.text();
                console.log('✅ CSV cargado, longitud:', csvText.length);
                
                profesionales = parseCSVToObjects(csvText);
                
                if (profesionales.length === 0) {
                    throw new Error('No se encontraron datos válidos en la hoja');
                }
                
                // Generar URL para cada profesional usando su ID_UNICO
                profesionales.forEach(prof => {
                    prof.urlCompleta = generarUrlProfesional(prof);
                });
                
                console.log(`✅ Profesionales cargados: ${profesionales.length}`);
                console.log('📋 IDs:', profesionales.slice(0, 5).map(p => p.idUnico));
                
                profesionalesFiltrados = [...profesionales];
                totalPages = Math.ceil(profesionalesFiltrados.length / ITEMS_PER_PAGE);
                currentPage = 1;
                
                profesionesUnicas = [...new Set(profesionales.map(p => p.profesion).filter(Boolean))];
                
                renderProfessions();
                renderCurrentPage();
                renderPagination();
                
                loading.style.display = 'none';
                cvsGrid.style.display = 'grid';
                paginationContainer.style.display = 'flex';
                
                datosCargados = true;
                
                // Verificar si hay fragmento pendiente
                if (fragmentoPendiente) {
                    console.log(`🎯 Abriendo fragmento pendiente: ${fragmentoPendiente}`);
                    abrirModalPorId(fragmentoPendiente);
                    fragmentoPendiente = null;
                } else {
                    // Verificar fragmento actual
                    verificarFragmentoInicial();
                }
                
            } catch (error) {
                console.error('❌ Error:', error);
                loading.innerHTML = `Error al cargar los datos: ${error.message}`;
            }
        }

        // ===== FUNCIÓN PARA PARSEAR CSV (CON ID_UNICO) =====
        function parseCSVToObjects(csvText) {
            const lines = csvText.split('\n').filter(line => line.trim() !== '');
            
            if (lines.length < 3) {
                console.warn('El archivo CSV tiene menos de 3 líneas');
                return [];
            }
            
            const headers = parseCSVLine(lines[0]);
            console.log('📋 Encabezados:', headers);
            
            // BUSCAR ÍNDICES POR NOMBRE EXACTO
            const idUnicoIndex = headers.findIndex(h => h.trim().toUpperCase() === 'ID_UNICO');
            const vacioIndex = headers.findIndex(h => h.trim().toUpperCase() === 'VACIO');
            
            console.log('📍 ID_UNICO índice:', idUnicoIndex);
            console.log('📍 VACIO índice:', vacioIndex);
            
            if (idUnicoIndex === -1) {
                console.error('❌ No se encontró la columna "ID_UNICO"');
                return [];
            }
            
            if (vacioIndex === -1) {
                console.error('❌ No se encontró la columna "VACIO"');
                return [];
            }
            
            const indices = {
                id: headers.indexOf('id'),
                nombre: headers.indexOf('nombre'),
                profesion: headers.indexOf('profesion'),
                edad: headers.indexOf('edad'),
                ubicacion: headers.indexOf('ubicacion'),
                imagen: headers.indexOf('imagen'),
                formacionAcademica: headers.indexOf('formacionAcademica'),
                nivelEducacion: headers.indexOf('nivelEducacion'),
                experienciaLaboral: headers.indexOf('experienciaLaboral'),
                resumen: headers.indexOf('resumen'),
                celular: headers.indexOf('celular'),
                facebook: headers.indexOf('facebook'),
                instagram: headers.indexOf('instagram'),
                linkedin: headers.indexOf('linkedin'),
                correo: headers.indexOf('correo'),
                idiomas: headers.indexOf('idiomas'),
                habilidades: headers.indexOf('habilidades')
            };
            
            const expIndices = [];
            for (let j = 1; j <= 5; j++) {
                expIndices.push({
                    empresa: headers.indexOf(`empresa${j}`),
                    tiempo: headers.indexOf(`tiempo${j}`),
                    puesto: headers.indexOf(`puesto${j}`)
                });
            }
            
            const objects = [];
            let filasOmitidas = 0;
            
            for (let i = 2; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);
                
                if (values.length <= Math.max(idUnicoIndex, vacioIndex)) {
                    filasOmitidas++;
                    continue;
                }
                
                const vacioValue = cleanValue(values[vacioIndex]);
                if (vacioValue !== 'VACIO') {
                    filasOmitidas++;
                    continue;
                }
                
                const idUnico = cleanValue(values[idUnicoIndex]);
                
                if (!idUnico || idUnico.length !== 10 || isNaN(idUnico)) {
                    filasOmitidas++;
                    continue;
                }
                
                const obj = {
                    id: i - 1,
                    idUnico: idUnico,
                    nombre: indices.nombre !== -1 ? cleanValue(values[indices.nombre]) : '',
                    profesion: indices.profesion !== -1 ? cleanValue(values[indices.profesion]) : '',
                    edad: indices.edad !== -1 ? parseInt(cleanValue(values[indices.edad])) || 0 : 0,
                    ubicacion: indices.ubicacion !== -1 ? cleanValue(values[indices.ubicacion]) : '',
                    imagen: indices.imagen !== -1 ? cleanValue(values[indices.imagen]) : '',
                    formacionAcademica: indices.formacionAcademica !== -1 ? cleanValue(values[indices.formacionAcademica]) : '',
                    nivelEducacion: indices.nivelEducacion !== -1 ? cleanValue(values[indices.nivelEducacion]) : '',
                    experienciaLaboral: indices.experienciaLaboral !== -1 ? cleanValue(values[indices.experienciaLaboral]) : '',
                    resumen: indices.resumen !== -1 ? cleanValue(values[indices.resumen]) : '',
                    celular: indices.celular !== -1 ? cleanValue(values[indices.celular]) : '',
                    facebook: indices.facebook !== -1 ? cleanValue(values[indices.facebook]) : '',
                    instagram: indices.instagram !== -1 ? cleanValue(values[indices.instagram]) : '',
                    linkedin: indices.linkedin !== -1 ? cleanValue(values[indices.linkedin]) : '',
                    correo: indices.correo !== -1 ? cleanValue(values[indices.correo]) : '',
                };
                
                // Procesar idiomas
                if (indices.idiomas !== -1 && values[indices.idiomas]) {
                    const idiomasRaw = cleanValue(values[indices.idiomas]);
                    obj.idiomasArray = idiomasRaw.split(',').map(i => i.trim()).filter(i => i.length > 0);
                } else {
                    obj.idiomasArray = [];
                }
                
                // Procesar habilidades
                if (indices.habilidades !== -1 && values[indices.habilidades]) {
                    const habilidadesRaw = cleanValue(values[indices.habilidades]);
                    obj.habilidadesArray = habilidadesRaw.split(',').map(h => h.trim()).filter(h => h.length > 0);
                } else {
                    obj.habilidadesArray = [];
                }
                
                // Procesar experiencias
                obj.experiencias = [];
                for (let j = 0; j < expIndices.length; j++) {
                    const expIdx = expIndices[j];
                    if (expIdx.empresa !== -1 && values[expIdx.empresa]) {
                        const empresa = cleanValue(values[expIdx.empresa]);
                        const tiempo = expIdx.tiempo !== -1 ? cleanValue(values[expIdx.tiempo]) : '';
                        const puesto = expIdx.puesto !== -1 ? cleanValue(values[expIdx.puesto]) : '';
                        
                        if (empresa && empresa.trim() !== '') {
                            obj.experiencias.push({
                                empresa: empresa,
                                tiempo: tiempo || 'No especificado',
                                puesto: puesto || 'No especificado'
                            });
                        }
                    }
                }
                
                if (obj.nombre && obj.nombre.trim() !== '') {
                    objects.push(obj);
                }
            }
            
            console.log(`📊 Profesionales válidos: ${objects.length}`);
            console.log(`📊 Filas omitidas: ${filasOmitidas}`);
            
            return objects;
        }

        // ===== FUNCIÓN AUXILIAR PARA LIMPIAR VALORES =====
        function cleanValue(value) {
            if (!value) return '';
            return value.replace(/^"|"$/g, '').trim();
        }

        // ===== FUNCIÓN AUXILIAR PARA PARSEAR UNA LÍNEA CSV =====
        function parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    result.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            
            result.push(current);
            return result;
        }

        // ===== RENDERIZAR PROFESIONES =====
        function renderProfessions() {
            professionsList.innerHTML = '<li class="active" data-profession="todos">✨ Todos los profesionales</li>';
            
            profesionesUnicas.sort().forEach(prof => {
                if (prof && prof.trim() !== '') {
                    professionsList.innerHTML += `<li data-profession="${prof}">${prof}</li>`;
                }
            });

            document.querySelectorAll('.professions-list li').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.professions-list li').forEach(li => li.classList.remove('active'));
                    this.classList.add('active');
                    const profesion = this.dataset.profession;
                    filterCVs(profesion);
                    
                    searchInput.value = '';
                    document.querySelectorAll('.professions-list li').forEach(li => li.classList.remove('hidden'));
                });
            });
        }

        // ===== FILTRAR CVs POR PROFESIÓN =====
        function filterCVs(profesion) {
            profesionalesFiltrados = profesion === 'todos' 
                ? [...profesionales]
                : profesionales.filter(p => p.profesion === profesion);
            
            currentPage = 1;
            totalPages = Math.ceil(profesionalesFiltrados.length / ITEMS_PER_PAGE);
            
            renderCurrentPage();
            renderPagination();
        }

        // ===== RENDERIZAR PÁGINA ACTUAL =====
        function renderCurrentPage() {
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const cvsToShow = profesionalesFiltrados.slice(startIndex, endIndex);
            
            renderCVs(cvsToShow);
        }

        // ===== RENDERIZAR TARJETAS CV =====
        function renderCVs(cvs) {
            cvsGrid.innerHTML = '';
            
            if (cvs.length === 0) {
                cvsGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: white;">No se encontraron profesionales</div>';
                return;
            }
            
            cvs.forEach(cv => {
                const card = document.createElement('div');
                card.className = 'cv-card';
                card.innerHTML = `
                    <div class="cv-card-header">
                        <div class="cv-card-image-col">
                            <img class="cv-card-image" src="${cv.imagen || 'https://via.placeholder.com/80'}" alt="${cv.nombre}" onerror="this.src='https://via.placeholder.com/80'">
                        </div>
                        <div class="cv-card-info-col">
                            <div class="cv-card-name">${cv.nombre || 'Nombre no disponible'}</div>
                            <div class="cv-card-profession">${cv.profesion || 'Profesión no especificada'}</div>
                            <div class="cv-card-age">${cv.edad || '?'} años</div>
                        </div>
                    </div>
                    <div class="cv-card-body">
                        <div class="cv-card-section">
                            <div class="cv-card-section-title">NIVEL DE EDUCACIÓN</div>
                            <div class="cv-card-section-content">${cv.nivelEducacion || 'No especificado'}</div>
                        </div>
                        <div class="cv-card-section">
                            <div class="cv-card-section-title">FORMACIÓN ACADÉMICA</div>
                            <div class="cv-card-section-content">${cv.formacionAcademica || 'No especificado'}</div>
                        </div>
                        <div class="cv-card-section">
                            <div class="cv-card-section-title">EXPERIENCIA LABORAL</div>
                            <div class="cv-card-section-content">${cv.experienciaLaboral || 'No especificado'}</div>
                        </div>
                    </div>
                    <div class="cv-card-footer">
                        <div class="cv-card-location">📍 ${cv.ubicacion || 'Ubicación no especificada'}</div>
                        <div class="cv-card-badge">Ver CV</div>
                    </div>
                `;
                card.addEventListener('click', () => openModal(cv.id));
                cvsGrid.appendChild(card);
            });
        }

        // ===== RENDERIZAR PAGINACIÓN =====
        function renderPagination() {
            if (totalPages <= 1) {
                paginationContainer.innerHTML = '';
                return;
            }

            let paginationHTML = '';
            
            paginationHTML += `
                <button class="pagination-button" onclick="goToPage(1)" ${currentPage === 1 ? 'disabled' : ''}>
                    ⏮️
                </button>
            `;
            
            paginationHTML += `
                <button class="pagination-button" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                    ◀️
                </button>
            `;
            
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            if (startPage > 1) {
                paginationHTML += `
                    <button class="pagination-button" onclick="goToPage(1)">1</button>
                `;
                if (startPage > 2) {
                    paginationHTML += `<span class="pagination-ellipsis">...</span>`;
                }
            }
            
            for (let i = startPage; i <= endPage; i++) {
                paginationHTML += `
                    <button class="pagination-button ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                        ${i}
                    </button>
                `;
            }
            
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    paginationHTML += `<span class="pagination-ellipsis">...</span>`;
                }
                paginationHTML += `
                    <button class="pagination-button" onclick="goToPage(${totalPages})">${totalPages}</button>
                `;
            }
            
            paginationHTML += `
                <button class="pagination-button" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                    ▶️
                </button>
            `;
            
            paginationHTML += `
                <button class="pagination-button" onclick="goToPage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>
                    ⏭️
                </button>
            `;
            
            paginationContainer.innerHTML = paginationHTML;
        }

        // ===== FUNCIÓN PARA CAMBIAR DE PÁGINA =====
        window.goToPage = function(page) {
            if (page < 1 || page > totalPages || page === currentPage) return;
            
            currentPage = page;
            renderCurrentPage();
            renderPagination();
            
            cvsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

       // ===== FORMATEAR TELÉFONO (FORMATO INTERNACIONAL) =====
function formatPhone(phone) {
    if (!phone || phone === '') return 'No especificado';
    
    // Eliminar cualquier caracter que no sea número
    const digits = phone.replace(/\D/g, '');
    
    // Para 11 dígitos (ej: 51945678901)
    if (digits.length === 11) {
        // Extraer los 9 dígitos después del código de país
        // Asumiendo que los primeros 2 dígitos son el código de país (51)
        const codigoPais = digits.substring(0, 2); // "51"
        const numero = digits.substring(2); // "945678901"
        
        // Formatear los 9 dígitos como: 945 678 901
        const numeroFormateado = numero.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        
        // Retornar con + y espacios
        return `+${codigoPais} ${numeroFormateado}`; // +51 945 678 901
    }
    
    // Si no son 11 dígitos, devolver los dígitos sin formato
    return digits;
}

        // ===== ABRIR MODAL =====
        function openModal(id) {
            const profesional = profesionales.find(p => p.id == id);
            if (!profesional) return;

            if (!profesional.urlCompleta) {
                profesional.urlCompleta = generarUrlProfesional(profesional);
            }

            const experienciasHTML = profesional.experiencias && profesional.experiencias.length > 0
                ? profesional.experiencias.map(exp => `
                    <div class="experience-item">
                        <div class="experience-company">🏢 ${exp.empresa || 'Empresa no especificada'}</div>
                        <div class="experience-position">👔 ${exp.puesto || 'Puesto no especificado'}</div>
                        <div class="experience-duration">⏱️ ${exp.tiempo || 'Duración no especificada'}</div>
                    </div>
                `).join('')
                : '<p>No hay experiencia laboral registrada</p>';

            const habilidadesList = profesional.habilidadesArray && profesional.habilidadesArray.length > 0
                ? profesional.habilidadesArray.map(h => `<li>${h}</li>`).join('')
                : '<li>No especificado</li>';
            
            const idiomasList = profesional.idiomasArray && profesional.idiomasArray.length > 0
                ? profesional.idiomasArray.map(i => `<li>${i}</li>`).join('')
                : '<li>No especificado</li>';

            modalContent.innerHTML = `
                <div class="modal-cv">
                    <div class="modal-left">
                        <img src="${profesional.imagen || 'https://via.placeholder.com/280'}" alt="${profesional.nombre}" onerror="this.src='https://via.placeholder.com/280'">
                        <h2>${profesional.nombre || 'Nombre no disponible'}</h2>
                        <p style="color: #667eea; font-weight: 600; font-size: 1.2rem;">${profesional.profesion || 'Profesión no especificada'}</p>
                        <p style="color: #718096;">🎂 ${profesional.edad || '?'} años</p>
                        <p style="color: #718096;">📍 ${profesional.ubicacion || 'Ubicación no especificada'}</p>
                        
                        <div class="contact-info">
                            <div class="contact-item">
                                <span class="contact-icon">📱</span>
                                <span class="contact-text">${formatPhone(profesional.celular)}</span>
                            </div>
                            <div class="contact-item">
                                <span class="contact-icon">📧</span>
                                <span class="contact-text">${profesional.correo || 'No especificado'}</span>
                            </div>
                            ${profesional.facebook && profesional.facebook !== '' ? `
                            <div class="contact-item">
                                <span class="contact-icon">👤</span>
                                <span class="contact-text"><a href="${profesional.facebook}" target="_blank">Facebook</a></span>
                            </div>` : ''}
                            ${profesional.instagram && profesional.instagram !== '' ? `
                            <div class="contact-item">
                                <span class="contact-icon">📷</span>
                                <span class="contact-text"><a href="${profesional.instagram}" target="_blank">Instagram</a></span>
                            </div>` : ''}
                            ${profesional.linkedin && profesional.linkedin !== '' ? `
                            <div class="contact-item">
                                <span class="contact-icon">💼</span>
                                <span class="contact-text"><a href="${profesional.linkedin}" target="_blank">LinkedIn</a></span>
                            </div>` : ''}
                        </div>
                        
                        <!-- ID_UNICO de Google Sheets -->
                        <div style="margin-top: 1rem; padding: 1rem; background: #e8f4fd; border-radius: 12px; border-left: 4px solid #667eea;">
                            <p style="font-size: 0.85rem; color: #2d3748; margin-bottom: 0.5rem; font-weight: 600;">
                                🔑 ID ÚNICO (Google Sheets):
                            </p>
                            <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                <span style="font-size: 1.2rem; font-weight: 700; color: #667eea; background: white; padding: 0.5rem 1.5rem; border-radius: 30px; border: 2px solid #667eea; letter-spacing: 2px;">
                                    ${profesional.idUnico}
                                </span>
                                <span style="font-size: 0.8rem; color: #4a5568; background: white; padding: 0.3rem 0.8rem; border-radius: 20px; border: 1px solid #cbd5e0;">
                                    10 dígitos
                                </span>
                            </div>
                        </div>
                        
                        <!-- URL con fragmento -->
                        <div style="margin-top: 1rem; padding: 1rem; background: #e8f4fd; border-radius: 12px; border-left: 4px solid #667eea;">
                            <p style="font-size: 0.85rem; color: #2d3748; margin-bottom: 0.5rem; font-weight: 600;">
                                🔗 URL con identificador:
                            </p>
                            <a href="${profesional.urlCompleta}" 
                               target="_blank" 
                               style="color: #667eea; word-break: break-all; font-size: 0.9rem; text-decoration: none; display: block; padding: 0.5rem; background: white; border-radius: 8px; border: 1px solid #667eea;">
                                ${profesional.urlCompleta}
                            </a>
                            <div style="display: flex; justify-content: center; align-items: center; margin-top: 0.5rem;">
                                <span style="font-size: 0.8rem; color: #4a5568; background: white; padding: 0.2rem 0.8rem; border-radius: 20px; border: 1px solid #cbd5e0;">
                                    🆔 ID: ${profesional.idUnico}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-right">
                        <h2>Curriculum Vitae</h2>
                        
                        <h3>📚 Formación Académica</h3>
                        <p>${profesional.formacionAcademica || 'No especificado'}</p>
                        
                        <h3>🎓 Nivel de Educación</h3>
                        <p>${profesional.nivelEducacion || 'No especificado'}</p>
                        
                        <h3>💼 Experiencia Laboral Detallada (Últimos 5 empleos)</h3>
                        ${experienciasHTML}
                        
                        <h3>⭐ Perfil Profesional</h3>
                        <p>${profesional.resumen || 'No especificado'}</p>
                        
                        <h3>🚀 Habilidades</h3>
                        <ul>${habilidadesList}</ul>
                        
                        <h3>🌍 Idiomas</h3>
                        <ul>${idiomasList}</ul>
                    </div>
                </div>
            `;
            
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }

        // ===== BUSCAR PROFESIONES =====
        function searchProfessions() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const professionItems = document.querySelectorAll('.professions-list li');
            
            professionItems.forEach(item => {
                const professionText = item.textContent.toLowerCase();
                if (searchTerm === '' || professionText.includes(searchTerm)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        }

        // ===== EVENT LISTENERS =====
        searchInput.addEventListener('input', searchProfessions);

        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });

        // Escuchar cambios en el hash (por si cambia mientras la página está abierta)
        window.addEventListener('hashchange', function() {
            const hash = window.location.hash.substring(1);
            if (hash && hash.length > 0 && datosCargados) {
                console.log('🔄 Hash cambiado a:', hash);
                abrirModalPorId(hash);
            }
        });

        // ===== INICIAR LA CARGA DE DATOS =====
        loadDataFromSheet();
