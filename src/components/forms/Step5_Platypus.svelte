<!-- src/lib/components/forms/Step5_Platypus.svelte -->
<script>
  import { formData } from '../../state/formStore.svelte.js';
  import AiTextarea from '../ui/AiTextarea.svelte';
</script>

<div>

  <!-- 1. DESCRIPCIÓN -->
  <div style="background: #fafafa; border: 1px solid var(--color-borde); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: #333; font-size: 1.1rem;">Descripción del proyecto (Máx 1000 palabras) *</h3>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">A. Enfoque general</label>
      <AiTextarea 
        id="platypusEnfoque" 
        bind:value={formData.platypusDescEnfoque} 
        rows={3} 
        placeholder="Ej: Esta investigación tiene un enfoque cualitativo y exploratorio desde los estudios culturales."
        instruccionesIA="Redacta un párrafo riguroso explicando exclusivamente el enfoque general y el paradigma metodológico de la investigación." 
      />
    </div>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">B. Métodos específicos</label>
      <AiTextarea 
        id="platypusMetodos" 
        bind:value={formData.platypusDescMetodos} 
        rows={3} 
        placeholder="Ej: Se realizarán 15 entrevistas semiestructuradas y talleres de cartografía social."
        instruccionesIA="Redacta un párrafo detallando los instrumentos y métodos específicos de recolección de información." 
      />
    </div>
    
    <div class="ui-form-group">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">C. Fases del estudio</label>
      <AiTextarea 
        id="platypusFases" 
        bind:value={formData.platypusDescFases} 
        rows={3} 
        placeholder="Ej: Fase 1: Revisión de literatura. Fase 2: Trabajo de campo. Fase 3: Análisis y devolución."
        instruccionesIA="Redacta de manera clara las etapas o fases operativas del proyecto." 
      />
    </div>
  </div>

  <!-- 2. OBJETIVO GENERAL -->
  <div style="background: #fafafa; border: 1px solid var(--color-borde); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: #333; font-size: 1.1rem;">Objetivo general de la propuesta *</h3>
    <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 1.5rem;">El sistema unirá estas tres partes en un solo párrafo fluido.</p>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">A. Acción y Objeto (¿Qué se investigará?)</label>
      <AiTextarea 
        id="platypusObjQue" 
        bind:value={formData.platypusObjQue} 
        rows={2} 
        placeholder="Ej: Analizar las transformaciones del paisaje mortuorio en el sur de Colombia..."
        instruccionesIA="Mejora este fragmento para que inicie con un verbo en infinitivo. Sé conciso y no pongas punto final." 
      />
    </div>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">B. Medio (¿Cómo se logrará?)</label>
      <AiTextarea 
        id="platypusObjComo" 
        bind:value={formData.platypusObjComo} 
        rows={2} 
        placeholder="Ej: ...a través de la recopilación de historias orales y revisión de archivos parroquiales..."
        instruccionesIA="Mejora este fragmento metodológico conectándolo con la palabra 'mediante' o 'a través de'. No pongas punto final." 
      />
    </div>
    
    <div class="ui-form-group">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">C. Finalidad (¿Para qué?)</label>
      <AiTextarea 
        id="platypusObjParaQue" 
        bind:value={formData.platypusObjParaQue} 
        rows={2} 
        placeholder="Ej: ...para comprender las dinámicas de memoria colectiva en contextos de conflicto."
        instruccionesIA="Mejora este fragmento conectándolo con la palabra 'para' o 'con el fin de'. Explica el propósito último de la investigación." 
      />
    </div>
  </div>

  <!-- 3. PROTOCOLO DE DATOS -->
  <div style="background: #fafafa; border: 1px solid var(--color-borde); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: #333; font-size: 1.1rem;">Protocolo de manejo de datos *</h3>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">A. Plataforma y almacenamiento</label>
      <AiTextarea 
        id="platypusDatosAlm" 
        bind:value={formData.platypusDatosAlmacenamiento} 
        rows={2} 
        placeholder="Ej: La información se guardará en una carpeta institucional de OneDrive protegida con contraseña."
        instruccionesIA="Redacta formalmente dónde y cómo se almacenarán los datos digitales o físicos de manera segura." 
      />
    </div>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">B. Tiempo de retención</label>
      <AiTextarea 
        id="platypusDatosRet" 
        bind:value={formData.platypusDatosRetencion} 
        rows={2} 
        placeholder="Ej: Los audios se conservarán hasta 3 años después de la publicación de resultados y luego serán eliminados."
        instruccionesIA="Redacta formalmente cuánto tiempo se conservarán los datos y cuál será su disposición final (ej. eliminación)." 
      />
    </div>
    
    <div class="ui-form-group">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">C. Acceso y privacidad</label>
      <AiTextarea 
        id="platypusDatosAcc" 
        bind:value={formData.platypusDatosAcceso} 
        rows={2} 
        placeholder="Ej: Solo el investigador principal tendrá acceso. Las transcripciones serán anonimizadas."
        instruccionesIA="Redacta formalmente quiénes tendrán acceso a los datos crudos y cómo se anonimizarán o protegerán." 
      />
    </div>
  </div>

  <!-- 4. CONTENCIÓN EMOCIONAL -->
  <div style="background: #fafafa; border: 1px solid var(--color-borde); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: #333; font-size: 1.1rem;">Contención emocional (Si aplica)</h3>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">A. Responsables en campo</label>
      <AiTextarea 
        id="platypusContResp" 
        bind:value={formData.platypusContencionResponsables} 
        rows={2} 
        placeholder="Ej: El investigador principal será el responsable de brindar el acompañamiento inicial."
        instruccionesIA="Indica formalmente quiénes serán las personas encargadas de brindar los primeros auxilios psicológicos." 
      />
    </div>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">B. Protocolo inmediato</label>
      <AiTextarea 
        id="platypusContAcc" 
        bind:value={formData.platypusContencionAcciones} 
        rows={2} 
        placeholder="Ej: Si se presenta angustia, se pausará la entrevista, se ofrecerá agua y escucha activa."
        instruccionesIA="Redacta formalmente qué acciones inmediatas se tomarán si un participante se altera." 
      />
    </div>
    
    <div class="ui-form-group">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">C. Rutas institucionales</label>
      <AiTextarea 
        id="platypusContRutas" 
        bind:value={formData.platypusContencionRutas} 
        rows={2} 
        placeholder="Ej: De ser necesario, se orientará al participante hacia la Decanatura de Estudiantes."
        instruccionesIA="Redacta formalmente a qué entidades, líneas de apoyo o instancias universitarias se derivará al participante si lo requiere." 
      />
    </div>
  </div>

  <!-- 5. MUESTRAS BIOLÓGICAS (Estática) -->
  <div class="ui-form-group">
    <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">Toma de muestras biológicas *</label>
    <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">Respuesta por defecto para Artes y Humanidades.</p>
    <textarea class="ui-form-input" bind:value={formData.platypusMuestras} rows="2"></textarea>
  </div>
</div>