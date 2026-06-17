<script>
  import { formData } from '../../state/formStore.svelte.js';
  import AiTextarea from '../ui/AiTextarea.svelte';
</script>

<div class="ui-form-group">
  <label class="ui-form-label" for="metodologias">1. ¿Qué actividades específicas realizarán los participantes?</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    El texto continuará esta frase: <em>"Su participación consistirá en hacer parte de..."</em>
  </p>
  
  <AiTextarea 
    id="metodologias"
    bind:value={formData.metodologiasLibres}
    rows={4}
    placeholder="Ej. talleres de investigación-creación en coautoría."
    esFragmento={true}
    instruccionesIA={`REGLA: El texto se insertará a la mitad de una oración. DEBE comenzar en minúscula y NO llevar punto final.
EJEMPLO ESPERADO:
Usuario: vamos a hacer talleres con estudiantes
Tu respuesta: talleres de investigación-creación enfocados en la colaboración con estudiantes`}
  />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label" for="resultados">2. ¿Cuáles serán los productos o resultados de divulgación?</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    El texto continuará esta frase: <em>"servirán como base para la producción de..."</em>
  </p>
  
  <AiTextarea 
    id="resultados"
    bind:value={formData.resultadosLibres}
    rows={4}
    placeholder="Ej. un archivo digital abierto y una serie de podcasts."
    esFragmento={true}
    instruccionesIA={`REGLA: El texto se insertará a la mitad de una oración. DEBE comenzar en minúscula y NO llevar punto final.
EJEMPLO ESPERADO:
Usuario: una web y unos podcasts
Tu respuesta: un repositorio web de acceso abierto y una serie de podcasts culturales`}
  />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label" for="procedimientos">3. Descripción adicional del procedimiento (Opcional):</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    Especifique detalles logísticos si lo requiere.
  </p>
  
  <AiTextarea 
    id="procedimientos"
    bind:value={formData.descripcionProcedimientos}
    rows={3}
    placeholder="Ej. Las sesiones de entrevista se realizarán de manera virtual."
    esFragmento={false}
    instruccionesIA="REGLA: Redacta un párrafo autocontenido, con mayúscula inicial y punto final, explicando el procedimiento logístico."
  />
</div>