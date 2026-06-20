<script>
  let { cerrarGuia } = $props();
</script>

<div style="background-color: #f4f7f6; padding: 2rem 2.5rem; border-bottom: 1px solid var(--color-borde); font-size: 0.9rem; color: var(--color-texto-secundario); line-height: 1.6; position: relative; max-height: 70vh; overflow-y: auto; overflow-x: hidden;">
  
  <button onclick={cerrarGuia} style="position: sticky; top: -1rem; float: right; margin-right: -1rem; background: #f4f7f6; border: none; font-size: 1.5rem; cursor: pointer; color: #888; transition: color 0.2s; z-index: 10; padding: 0.2rem 0.5rem; border-radius: 4px;" onmouseover={(e) => e.currentTarget.style.color='#333'} onmouseout={(e) => e.currentTarget.style.color='#888'} aria-label="Cerrar instrucciones">&times;</button>
  
  <h3 style="margin-top: 0; color: var(--color-primario); font-size: 1.2rem; margin-bottom: 1.5rem;">Guía de Uso: Suite de Ética de Investigación</h3>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
    <div>
      <h4 style="margin-top: 0; color: #333; margin-bottom: 0.5rem; font-size: 1rem;">1. Jerarquía de Documentos</h4>
      <p style="margin-top: 0; margin-bottom: 1.2rem;">
        La pestaña <strong>Asistente Platypus</strong> es el documento central y obligatorio. Le ayuda a preparar las respuestas exactas que le pedirá la plataforma institucional. Los demás módulos (Consentimiento, Asentimiento y Política de Datos) son <strong>anexos complementarios</strong>; usted solo debe generarlos y adjuntarlos si el diseño metodológico de su proyecto específico los requiere.
      </p>
      
      <h4 style="margin-top: 0; color: #333; margin-bottom: 0.5rem; font-size: 1rem;">2. Trámite Institucional</h4>
      <p style="margin-top: 0; margin-bottom: 0;">
        Recuerde que los profesores son evaluados por el Comité Institucional y los estudiantes por el Comité de Facultad. Para formalizar su solicitud, copie los textos generados aquí en el formulario oficial de <a href="https://platypus.uniandes.edu.co" target="_blank" rel="noopener noreferrer" style="color: var(--color-primario); font-weight: bold; text-decoration: underline;">Platypus</a> y suba sus anexos en PDF. <br><br>
        <strong>Requisito:</strong> Todos los investigadores deben adjuntar el certificado del curso de ética (<a href="https://investigacioncreacion.uniandes.edu.co/sites/default/files/anexo6-infografia-certificacion-cursos-etica.png" target="_blank" rel="noopener noreferrer" style="color: var(--color-primario); text-decoration: underline;">ver instructivo</a>). Para más información, consulte el <a href="https://investigacioncreacion.uniandes.edu.co/es/comite-de-etica-institucional" target="_blank" rel="noopener noreferrer" style="color: var(--color-primario); text-decoration: underline;">reglamento detallado</a>.
      </p>
    </div>

    <div>
      <h4 style="margin-top: 0; color: #333; margin-bottom: 0.5rem; font-size: 1rem;">3. Asistencia de IA (100% Privada y Local)</h4>
      <p style="margin-top: 0; margin-bottom: 0.8rem;">
        Esta suite procesa la Inteligencia Artificial directamente en su navegador, garantizando que sus datos de investigación nunca se envíen a servidores externos. Cuenta con dos niveles de ayuda:
      </p>
      <ul style="margin-top: 0; padding-left: 1.2rem; margin-bottom: 1.2rem;">
        <li style="margin-bottom: 0.4rem;"><strong>Generación de Párrafos:</strong> Al llenar un cuadro de texto guiándose por los ejemplos en gris, la IA transformará esos apuntes en un texto académico formal y cohesionado.</li>
        <li><strong>Consejero IA:</strong> Ubicado en el panel de vista previa. Esta función lee su borrador completo y actúa como un par evaluador, señalando huecos metodológicos y dándole consejos concretos de mejora antes de exportar.</li>
      </ul>

      <h4 style="margin-top: 0; color: #333; margin-bottom: 0.5rem; font-size: 1rem;">4. Glosario</h4>
      <p style="margin-top: 0; margin-bottom: 0;">
        Si tiene dudas sobre algún término legal o conceptual que pide el formulario (por ejemplo: diferencias entre anonimización y confidencialidad, tipos de riesgo, o revictimización), haga clic en el botón superior de <strong>Glosario</strong> para ver definiciones claras y ejemplos prácticos.
      </p>
    </div>

    <!-- <div style="grid-column: 1 / -1; border-top: 1px solid #dde3e1; padding-top: 2rem; margin-top: 0.5rem;">
      <h4 style="margin-top: 0; color: #333; margin-bottom: 1rem; font-size: 1rem; text-align: center;">5. Video Tutorial: Cómo usar la Suite paso a paso</h4>
      <div style="max-width: 800px; margin: 0 auto; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background-color: #000;">
        <iframe 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
          src="https://www.youtube.com/embed/REEMPLAZAR_CON_ID_DEL_VIDEO" 
          title="Video Tutorial Suite de Ética"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div> -->

  </div>
</div>