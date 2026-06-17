<!-- src/lib/components/forms/Step3_Risks.svelte -->
<script>
  import { formData } from '../../state/formStore.svelte.js';
  import AiTextarea from '../ui/AiTextarea.svelte';
</script>

<div class="ui-form-group">
  <label class="ui-form-label" for="nivelRiesgo">1. Clasificación del Riesgo (Res. 008430):</label>
  <select class="ui-form-input" id="nivelRiesgo" bind:value={formData.nivelRiesgo}>
    <option value="Sin Riesgo">Sin Riesgo (Investigación documental o retrospectiva)</option>
    <option value="Riesgo Mínimo">Riesgo Mínimo (Entrevistas, talleres, trabajo de campo común)</option>
    <option value="Riesgo Mayor al Mínimo">Riesgo Mayor al Mínimo (Temas altamente sensibles, vulnerabilidad)</option>
  </select>
</div>

<div class="ui-form-group">
  <label class="ui-form-label" for="riesgos">2. Descripción de molestias o riesgos esperados:</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    Va después de definir el nivel de riesgo. Ej. Fatiga o sensibilidad emocional.
  </p>
  
  <AiTextarea 
    id="riesgos"
    bind:value={formData.descripcionRiesgos}
    rows={3}
    placeholder="Ej. Los riesgos se limitan a la fatiga normal asociada a recorridos prolongados en campo..."
    esFragmento={false}
    instruccionesIA="REGLA: Redacta oraciones completas, formales y autocontenidas. DEBE iniciar con mayúscula y terminar con punto final."
  />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label" for="contencion">3. Medidas de contención / Acompañamiento:</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    El texto continuará esta frase: <em>"En caso de experimentar algún malestar derivado de las actividades, [su texto]"</em>
  </p>
  
  <AiTextarea 
    id="contencion"
    bind:value={formData.medidasContencion}
    rows={3}
    placeholder="Ej. se pausará la actividad y los investigadores orientarán hacia servicios de salud institucional."
    esFragmento={true}
    instruccionesIA={`REGLA: El texto va después de una coma. DEBE comenzar en minúscula y NO llevar punto final.
EJEMPLO ESPERADO:
Usuario: les daremos agua y llamaremos a la enfermería
Tu respuesta: se pausará el encuentro de inmediato, se ofrecerá un espacio de descanso y se brindará orientación hacia los servicios de salud y bienestar de la institución`}
  />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label" for="beneficios">4. Beneficios esperados:</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    El texto continuará esta frase: <em>"Sin embargo, usted contribuirá a [su texto]"</em>
  </p>
  
  <AiTextarea 
    id="beneficios"
    bind:value={formData.beneficios}
    rows={3}
    placeholder="Ej. la construcción de conocimiento colectivo y la consolidación de un archivo de memoria."
    esFragmento={true}
    instruccionesIA={`REGLA: El texto continuará una oración que termina en "contribuirá a". DEBE comenzar en minúscula y NO llevar punto final.
EJEMPLO ESPERADO:
Usuario: generar nuevo conocimiento metodológico
Tu respuesta: la generación de innovaciones metodológicas en el campo de las humanidades y la coautoría de un archivo de acceso abierto`}
  />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label" for="datos">5. Confidencialidad y Manejo de Datos:</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    ¿Cómo garantizará la privacidad y dónde se almacenará la información?
  </p>
  
  <AiTextarea 
    id="datos"
    bind:value={formData.manejoDatos}
    rows={3}
    placeholder="Ej. Los datos serán anonimizados y resguardados en un repositorio encriptado de la Universidad."
    esFragmento={false}
    instruccionesIA="REGLA: Redacta un párrafo claro y estructurado. Explica las garantías de confidencialidad y el almacenamiento de los datos. Usa mayúscula inicial y punto final."
  />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem; background-color: #f9f9f9; padding: 1rem; border-radius: 6px; border: 1px solid var(--color-borde);">
  <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: bold;">
    <input type="checkbox" bind:checked={formData.incluyeAudiovisual} />
    ¿El proyecto incluye registro fotográfico, sonoro o de video de los participantes?
  </label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-top: 0.5rem; margin-bottom: 0;">Al marcar esta opción, se añadirá automáticamente una cláusula de cesión de derechos de imagen en el documento.</p>
</div>