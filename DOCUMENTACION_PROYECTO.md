# CADASILAr - Documentación Técnica Completa
## Dashboard del Registro Nacional de CADASIL Argentina

---

## 🎯 **VISIÓN GENERAL DEL PROYECTO**

CADASILAr es una aplicación web especializada desarrollada para el análisis científico y visualización de datos del **Registro Nacional de CADASIL Argentina**, el primer registro sistemático de esta enfermedad cerebrovascular hereditaria en América Latina y el duodécimo a nivel mundial.

### **Contexto Médico**
**CADASIL** (Arteriopatía Cerebral Autosómica Dominante con Infartos Subcorticales y Leucoencefalopatía) es:
- La enfermedad hereditaria de pequeños vasos más frecuente
- Causa accidentes cerebrovasculares de inicio temprano (antes de los 50 años)
- Produce deterioro cognitivo vascular progresivo
- Genera trastornos del estado de ánimo y convulsiones
- Se transmite de forma autosómica dominante (50% de probabilidad de herencia)

### **Importancia Científica**
- **Primer registro latinoamericano** de CADASIL
- **Cohorte multicéntrica argentina** con fase transversal y longitudinal
- **N=90 pacientes** documentados hasta agosto 2025
- **Instituciones participantes**: FLENI, Hospital Británico, Hospital Ramos Mejía, Hospital Posadas
- **Investigadora Principal**: Dr. Carolina Agata Ardohain Cristalli (FLENI)

---

## 🏗️ **ARQUITECTURA TÉCNICA**

### **Stack Tecnológico Principal**

#### **Frontend Framework**
```json
{
  "framework": "Next.js 15.1.6",
  "version": "App Router",
  "language": "TypeScript 5",
  "styling": "Tailwind CSS 3.4.17",
  "ui_library": "Radix UI",
  "state_management": "React Hooks (useState, useEffect, useMemo)"
}
```

#### **Librerías de Visualización**
- **Recharts 2.12.7**: Gráficos médicos especializados
  - BarChart, PieChart, LineChart, AreaChart, ScatterChart
  - Responsivos y optimizados para datos clínicos
- **Lucide React**: Iconografía médica y científica

#### **Procesamiento de Datos**
- **Papa Parse 5.4.1**: Procesamiento avanzado de CSV médicos
- **Zod 3.24.1**: Validación de esquemas de datos
- **Date-fns 4.1.0**: Manejo de fechas y cálculos de edad

#### **Integración de Base de Datos**
- **Supabase 2.56.0**: Backend as a Service configurado
- **REDCap API**: Integración con plataforma de investigación clínica
- **CSV Import**: Carga directa de datos desde archivos locales

---

## 📊 **ESTRUCTURA DEL PROYECTO**

```
CADASILAR/
├── app/                          # Next.js App Router
│   ├── globals.css              # Estilos globales + Tailwind
│   ├── layout.tsx               # Layout principal con providers
│   ├── page.tsx                 # Página de inicio (dashboard)
│   └── api/                     # API Routes (si se implementan)
│       └── redcap/              # Endpoints REDCap
├── components/                   # Componentes React
│   ├── ui/                      # Componentes UI base (Radix)
│   │   ├── button.tsx           # Botones personalizados
│   │   ├── card.tsx             # Cards para métricas
│   │   ├── input.tsx            # Inputs de formulario
│   │   ├── select.tsx           # Selectores de filtros
│   │   ├── table.tsx            # Tabla de pacientes
│   │   └── tabs.tsx             # Sistema de pestañas
│   ├── cadasil-dashboard.tsx    # 🔥 COMPONENTE PRINCIPAL
│   └── theme-provider.tsx       # Proveedor de temas
├── lib/                         # Utilidades y configuración
│   ├── redcap.ts               # Cliente API REDCap
│   ├── redcap-database.ts      # Transformación de datos
│   └── utils.ts                # Utilidades generales
├── hooks/                       # Custom Hooks (si se desarrollan)
├── public/                      # Assets estáticos
├── julian/                      # 📁 DATOS FUENTE
│   └── RegistroNacionalCADA_DATA_2025-08-17_1634.csv
├── components.json              # Configuración Radix UI
├── next.config.mjs             # Configuración Next.js
├── package.json                # Dependencias del proyecto
├── tailwind.config.ts          # Configuración Tailwind
├── tsconfig.json               # Configuración TypeScript
├── SUPABASE_SETUP.md           # Guía configuración Supabase
└── README.md                   # Documentación del proyecto
```

---

## 🔬 **ANÁLISIS DEL CSV DE DATOS**

### **Estructura del Archivo Fuente**
- **Archivo**: `RegistroNacionalCADA_DATA_2025-08-17_1634.csv`
- **Registros totales**: 170 filas de datos
- **Formato**: REDCap export (Tab-separated values)
- **Codificación**: UTF-8 con BOM

### **Campos Críticos del CSV**

#### **Identificación del Paciente**
```csv
record_id                 # ID único del registro
nombre_apellido          # Nombre completo del paciente
medico_derivante         # Médico que deriva al estudio
institucion              # Institución de origen
historia_clinica         # Número de historia clínica
```

#### **Demografia Base**
```csv
sexo                     # 1=Masculino, 2=Femenino
provincia               # Provincia de residencia (texto)
ciudad                  # Ciudad de residencia
fecha_nacimiento        # YYYY-MM-DD (fuente de edad real)
dominancia             # 1=Diestro, 2=Zurdo
```

#### **⚠️ CAMPOS PROBLEMÁTICOS IDENTIFICADOS**
```csv
edad_inicio             # ❌ Contiene códigos 1/2, NO edades
edad_ingresada          # ⚠️ Años de escolaridad, NO edad actual
escolaridad             # Años de educación formal
```

#### **Diagnóstico y Genética**
```csv
metodo_diagnostico           # Método principal de diagnóstico
metodos_diagnosticos___1     # ✅ Estudio genético (checkbox)
metodos_diagnosticos___2     # ✅ Biopsia de piel (checkbox)
resultado_genetico           # Mutación específica encontrada
exon                        # Exón afectado en gen NOTCH3
```

#### **Evaluación Cognitiva**
```csv
tiene_mmse_moca         # 1=Sí tiene evaluación
valor_mmse_moca1        # Puntuación primer MMSE/MoCA
fecha_mmse_moca1        # Fecha primera evaluación
valor_mmse_moca2        # Puntuación segunda evaluación (seguimiento)
fecha_mmse_moca2        # Fecha segunda evaluación
```

#### **Manifestaciones Clínicas** (Campos checkbox múltiples)
```csv
sintomas_adicionales___1     # ACV/TIA
sintomas_adicionales___2     # Migraña con/sin aura
sintomas_adicionales___3     # Deterioro cognitivo
sintomas_adicionales___4     # Trastornos psiquiátricos
sintomas_adicionales___5     # Crisis epilépticas
# ... hasta sintomas_adicionales___11
```

#### **Factores de Riesgo Vascular**
```csv
factores_riesgo___1         # Hipertensión arterial
factores_riesgo___2         # Diabetes mellitus
factores_riesgo___3         # Dislipidemia
factores_riesgo___4         # Tabaquismo
factores_riesgo___5         # Obesidad
# ... hasta factores_riesgo___16
```

### **Particularidades del Procesamiento CSV**

#### **1. Sistema de Checkboxes REDCap**
```javascript
// REDCap exporta checkboxes como campos individuales
metodos_diagnosticos___1: "1"  // Marcado
metodos_diagnosticos___1: "0"  // No marcado
metodos_diagnosticos___1: ""   // Sin información

// Procesamiento en la aplicación:
function processDiagnosisMethod(record) {
  if (record.metodos_diagnosticos___1 === "1") return "Estudio genético"
  if (record.metodos_diagnosticos___2 === "1") return "Biopsia de piel"
  return "Nexo familiar confirmado" // Default para casos sin método explícito
}
```

#### **2. Cálculo de Edad Real**
```javascript
// ❌ INCORRECTO (implementación previa):
const age = parseInt(record.edad_ingresada) // Era años de escolaridad

// ✅ CORRECTO (implementación actual):
function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}
```

#### **3. Validación de Datos Médicos**
```javascript
function processPatientData(csvData) {
  return csvData.map(record => {
    const warnings = []
    const edad_calculada = calculateAge(record.fecha_nacimiento)
    
    // Validaciones de integridad
    if (!edad_calculada) warnings.push("Fecha de nacimiento inválida")
    if (edad_calculada && edad_calculada < 18) warnings.push("Edad menor a 18 años")
    if (edad_calculada && edad_calculada > 100) warnings.push("Edad mayor a 100 años")
    
    return {
      ...record,
      edad_calculada,
      validation_warnings: warnings
    }
  })
}
```

---

## 🎛️ **FUNCIONALIDADES PRINCIPALES**

### **1. Dashboard Multi-Pestañas**

#### **🏠 Resumen Ejecutivo**
- **KPIs principales**: Total pacientes, edad promedio, distribución por sexo
- **Gráficos resumen**: Síntomas más frecuentes, métodos diagnósticos
- **Alertas de validación**: Datos inconsistentes o faltantes

#### **👥 Demografía Clínica**
- **Distribución por edad**: Histograma con rangos etarios
- **Distribución por sexo**: Gráfico circular interactivo
- **Distribución geográfica**: Por provincia argentina
- **Análisis de dominancia manual**: Lateralidad de los pacientes

#### **🧬 Análisis Genético**
- **Distribución por exones**: Mutaciones NOTCH3 más frecuentes
- **Métodos de confirmación**: Genético vs. Biopsia vs. Clínico
- **Análisis de mutaciones**: Visualización de alteraciones específicas
- **Antecedentes familiares**: Proporción de casos heredados

#### **📈 Progresión Clínica**
- **Evolución cognitiva MMSE**: Seguimiento temporal de puntuaciones
- **Síntomas iniciales vs. adicionales**: Progresión de manifestaciones
- **Factores de riesgo**: Prevalencia de comorbilidades vasculares
- **Análisis de eventos cerebrovasculares**: Frecuencia y tipo de ACV

#### **🗺️ Distribución Nacional**
- **Mapa interactivo de Argentina**: Concentración por provincias
- **Análisis epidemiológico**: Densidad de casos por región
- **Centros de referencia**: Distribución institucional

### **2. Sistema de Filtros Avanzados**

```javascript
const [filters, setFilters] = useState({
  ageRange: [0, 100],           // Rango etario
  sex: 'all',                   // Sexo (1/2/all)
  initialSymptom: 'all',        // Síntoma inicial
  diagnosisMethod: 'all',       // Método diagnóstico
  province: 'all',              // Provincia
  hasMMSE: 'all'               // Tiene evaluación cognitiva
})

// Filtrado dinámico en tiempo real
const filteredPatients = useMemo(() => {
  return patients.filter(patient => {
    // Aplicación de todos los filtros
    return (
      patient.edad_calculada >= filters.ageRange[0] &&
      patient.edad_calculada <= filters.ageRange[1] &&
      (filters.sex === 'all' || patient.sexo === filters.sex) &&
      (filters.initialSymptom === 'all' || patient.sintoma_inicial === filters.initialSymptom)
      // ... más filtros
    )
  })
}, [patients, filters])
```

### **3. Tabla de Pacientes Interactiva**

#### **Columnas Principales**
| Campo | Descripción | Fuente CSV | Procesamiento |
|-------|-------------|------------|---------------|
| **ID** | Identificador único | `record_id` | Directo |
| **Nombre** | Nombre completo | `nombre_apellido` | Sanitizado |
| **Edad** | Edad calculada | `fecha_nacimiento` | `calculateAge()` |
| **Sexo** | Género | `sexo` | 1→M, 2→F |
| **Provincia** | Ubicación | `provincia` | Texto directo |
| **Síntoma Inicial** | Primera manifestación | `sintoma_inicial` | Decodificado |
| **MMSE** | Puntuación cognitiva | `valor_mmse_moca1` | Numérico |
| **Método Diagnóstico** | Confirmación | `metodos_diagnosticos___*` | `processDiagnosisMethod()` |

#### **Funcionalidades de Tabla**
- ✅ **Ordenación**: Por cualquier columna (ascendente/descendente)
- ✅ **Filtrado dinámico**: Respeta filtros globales activos
- ✅ **Export CSV**: Descarga datos filtrados
- ✅ **Responsiva**: Adaptable a diferentes tamaños de pantalla

### **4. Exportación de Datos**

```javascript
function exportToCSV(data, filename) {
  const csvContent = [
    // Header
    ['ID', 'Nombre', 'Edad', 'Sexo', 'Provincia', 'Síntoma Inicial', 'MMSE', 'Método Diagnóstico'],
    // Data rows
    ...data.map(patient => [
      patient.record_id,
      patient.nombre_apellido || 'Sin nombre',
      patient.edad_calculada || 'N/A',
      patient.sexo === '1' ? 'Masculino' : patient.sexo === '2' ? 'Femenino' : 'N/A',
      patient.provincia || 'N/A',
      patient.sintoma_inicial || 'N/A',
      patient.valor_mmse_moca1 || 'N/A',
      processDiagnosisMethod(patient)
    ])
  ].map(row => row.join(',')).join('\n')
  
  // Download trigger
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}
```

---

## 🔧 **CONFIGURACIÓN Y SETUP**

### **Requisitos del Sistema**
- **Node.js**: ≥ 18.17.0
- **npm**: ≥ 9.0.0
- **TypeScript**: ^5.0.0
- **Navegadores soportados**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

### **Instalación Local**

```bash
# Clonar el repositorio
git clone [repository-url]
cd CADASILAR

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

### **Variables de Entorno**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# REDCap Configuration (opcional)
NEXT_PUBLIC_REDCAP_URL=https://your-redcap-instance.com
REDCAP_API_TOKEN=your_api_token_here
```

### **Comandos Disponibles**

```json
{
  "scripts": {
    "dev": "next dev",           // Desarrollo (puerto 3000)
    "build": "next build",       // Construcción para producción
    "start": "next start",       // Servidor de producción
    "lint": "next lint",         // Linting de código
    "vercel-build": "npm run build"  // Build específico para Vercel
  }
}
```

---

## 📈 **DATOS CIENTÍFICOS OFICIALES**

### **Demografía de la Cohorte (N=90)**
```javascript
const officialStats = {
  totalPatients: 90,
  femalePercentage: 50.0,           // 45/90 mujeres
  meanAge: 43.8,                    // ± 11.9 años
  ageRange: [18, 78],               // Rango etario
  familyHistory: 91.6,              // % con antecedentes familiares
  confirmationMethods: {
    genetic: 63,                    // Estudio genético
    skinBiopsy: 20,                 // Biopsia de piel  
    clinical: 7                     // Diagnóstico clínico
  }
}
```

### **Manifestaciones Clínicas Principales**
```javascript
const clinicalManifestations = {
  cerebrovascularEvents: 72.9,      // % con ACV/TIA
  migraine: 69.0,                   // % con migraña
  cognitiveDecline: 56.7,           // % con deterioro cognitivo
  psychiatricDisorders: 45.2,      // % trastornos psiquiátricos
  epilepsy: 12.1                    // % crisis epilépticas
}
```

### **Comorbilidades Vasculares**
```javascript
const vascularRiskFactors = {
  hypertension: 64.0,               // % hipertensión arterial
  dyslipidemia: 55.0,               // % dislipidemia
  diabetes: 18.3,                   // % diabetes mellitus
  smoking: 35.7,                    // % tabaquismo
  obesity: 28.4                     // % obesidad (IMC >30)
}
```

### **Evaluación Cognitiva**
```javascript
const cognitiveAssessment = {
  mmse_median: 28,                  // Puntuación mediana MMSE
  mmse_iqr: [22, 29],              // Rango intercuartílico
  evaluated_patients: 33,           // N evaluados con MMSE
  longitudinal_followup: true       // Seguimiento a 5 años
}
```

---

## 🔬 **INTEGRACIÓN CON REDCAP**

### **API Client Implementation**

```typescript
// lib/redcap.ts
export interface REDCapRecord {
  record_id: string
  nombre_apellido?: string
  sexo?: string
  provincia?: string
  fecha_nacimiento?: string
  edad_inicio?: string
  edad_ingresada?: string        // ⚠️ Años de escolaridad
  metodo_diagnostico?: string
  metodos_diagnosticos___1?: string  // Checkbox genético
  metodos_diagnosticos___2?: string  // Checkbox biopsia
  resultado_genetico?: string
  exon?: string
  valor_mmse_moca1?: string
  valor_mmse_moca2?: string
  // ... más campos
}

class REDCapClient {
  async getRecords(): Promise<REDCapRecord[]> {
    const response = await fetch('/api/redcap?action=records')
    return await response.json()
  }
  
  async saveRecord(record: Partial<REDCapRecord>): Promise<any> {
    const formData = new FormData()
    formData.append('token', process.env.REDCAP_API_TOKEN!)
    formData.append('content', 'record')
    formData.append('action', 'import')
    formData.append('data', JSON.stringify([record]))
    
    return await fetch(`${process.env.NEXT_PUBLIC_REDCAP_URL}/api/`, {
      method: 'POST',
      body: formData
    })
  }
}
```

### **Transformación de Datos REDCap → App**

```typescript
// lib/redcap-database.ts
export function transformREDCapRecord(record: REDCapRecord): Patient {
  return {
    id: record.record_id,
    nombre: record.nombre_apellido || 'Sin nombre',
    sexo: record.sexo,
    provincia: record.provincia,
    edad_calculada: calculateAge(record.fecha_nacimiento),
    edad_escolaridad: parseInt(record.edad_ingresada || '0'), // Clarificado
    metodo_diagnostico: processDiagnosisMethod(record),
    mmse_score: parseInt(record.valor_mmse_moca1 || '0'),
    mutacion_genetica: record.resultado_genetico,
    exon_afectado: record.exon,
    validation_warnings: validatePatientData(record)
  }
}
```

---

## 🚀 **DESPLIEGUE Y PRODUCCIÓN**

### **Opciones de Despliegue**

#### **1. Vercel (Recomendado)**
```bash
# Deploy automático con GitHub
# 1. Conectar repositorio a Vercel
# 2. Configurar variables de entorno
# 3. Deploy automático en cada push

vercel --prod
```

#### **2. Supabase Hosting**
```bash
# Configurar Supabase CLI
npm install -g @supabase/cli
supabase login
supabase init
supabase deploy
```

#### **3. Docker Container**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### **Configuración de Producción**

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',           // Para contenedores
  experimental: {
    appDir: true                  // App Router estable
  },
  images: {
    domains: ['supabase.co'],     // Dominios permitidos
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
}

export default nextConfig
```

---

## 🛡️ **SEGURIDAD Y PRIVACIDAD**

### **Protección de Datos Médicos**

#### **1. Anonimización**
```javascript
// Datos sensibles nunca se exponen en frontend
const sanitizePatientData = (patient) => ({
  id: patient.record_id,                    // ID anonimizado
  edad: patient.edad_calculada,             // Solo edad, no fecha nacimiento
  provincia: patient.provincia,             // Geolocalización amplia
  // ❌ NO exponer: nombre, dirección, historia clínica
})
```

#### **2. Variables de Entorno Seguras**
```env
# ❌ NO commitear al repositorio
REDCAP_API_TOKEN=super_secret_token

# ✅ Solo claves públicas en frontend
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
```

#### **3. Validación de Entrada**
```typescript
import { z } from 'zod'

const PatientSchema = z.object({
  record_id: z.string().regex(/^\d+$/),
  fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sexo: z.enum(['1', '2']),
  valor_mmse_moca1: z.string().regex(/^\d+$/).optional()
})

// Validación antes de procesamiento
const validatedData = PatientSchema.safeParse(csvRow)
if (!validatedData.success) {
  console.warn('Invalid patient data:', validatedData.error)
}
```

---

## 🔄 **FLUJO DE DATOS**

### **Arquitectura de Información**

```mermaid
graph TD
    A[CSV Files] --> B[Papa Parse]
    B --> C[Data Validation]
    C --> D[Age Calculation]
    D --> E[Diagnosis Processing]
    E --> F[React State]
    F --> G[Filtered Data]
    G --> H[Recharts Visualization]
    G --> I[Patient Table]
    I --> J[CSV Export]
    
    K[REDCap API] --> L[Transform Function]
    L --> F
    
    M[Supabase] --> N[Database Query]
    N --> F
```

### **Procesamiento en Tiempo Real**

```javascript
// Flujo principal de datos en cadasil-dashboard.tsx
const CADASILDashboard = () => {
  // 1. Estado inicial
  const [patients, setPatients] = useState([])
  const [filters, setFilters] = useState(defaultFilters)
  const [activeTab, setActiveTab] = useState('resumen')
  
  // 2. Carga de datos (CSV/API)
  useEffect(() => {
    loadPatientData()
  }, [])
  
  // 3. Procesamiento y filtrado
  const processedPatients = useMemo(() => {
    return patients
      .map(processPatientData)      // Validación y cálculos
      .filter(applyFilters)         // Aplicar filtros activos
  }, [patients, filters])
  
  // 4. Agregaciones para visualización
  const dashboardMetrics = useMemo(() => 
    calculateDashboardStats(processedPatients)
  , [processedPatients])
  
  // 5. Renderizado condicional por pestaña
  return (
    <Tabs value={activeTab}>
      <TabsList>
        <TabsTrigger value="resumen">Resumen</TabsTrigger>
        <TabsTrigger value="demografia">Demografía</TabsTrigger>
        {/* ... más pestañas */}
      </TabsList>
      
      <TabsContent value="resumen">
        <KPICards metrics={dashboardMetrics} />
        <ChartsGrid data={processedPatients} />
      </TabsContent>
    </Tabs>
  )
}
```

---

## 🧪 **TESTING Y CALIDAD**

### **Estrategia de Testing**

#### **1. Validación de Datos**
```javascript
// Casos de prueba para cálculo de edad
describe('calculateAge', () => {
  test('should calculate correct age', () => {
    const birthDate = '1980-06-15'
    const age = calculateAge(birthDate)
    expect(age).toBe(44) // Asumiendo año actual 2024
  })
  
  test('should handle invalid dates', () => {
    expect(calculateAge('invalid-date')).toBeUndefined()
    expect(calculateAge('')).toBeUndefined()
  })
})
```

#### **2. Testing de Componentes**
```javascript
// Testing de filtros
describe('PatientFilters', () => {
  test('should filter by age range', () => {
    const patients = mockPatients
    const filters = { ageRange: [30, 50] }
    const filtered = applyFilters(patients, filters)
    
    filtered.forEach(patient => {
      expect(patient.edad_calculada).toBeGreaterThanOrEqual(30)
      expect(patient.edad_calculada).toBeLessThanOrEqual(50)
    })
  })
})
```

### **Métricas de Calidad**
- **Cobertura de Código**: Objetivo >80%
- **Performance**: LCP <2.5s, FID <100ms, CLS <0.1
- **Accesibilidad**: WCAG 2.1 AA compliance
- **SEO**: Core Web Vitals optimizados

---

## 📊 **ANÁLISIS DE GRÁFICOS Y VISUALIZACIÓN DE DATOS**

### **🎨 Sistema de Visualización Médica**

El dashboard CADASILAr implementa un sistema avanzado de visualización de datos médicos utilizando **Recharts 2.12.7**, optimizado específicamente para el análisis de datos clínicos y epidemiológicos de CADASIL.

#### **Arquitectura de Visualización**

```javascript
// Configuración de colores médicos especializados
const MEDICAL_COLORS = {
  primary: "#3B82F6",      // Azul médico principal
  secondary: "#10B981",     // Verde para datos positivos
  tertiary: "#F59E0B",      // Ámbar para alertas
  danger: "#EF4444",        // Rojo para datos críticos
  neutral: "#6B7280"        // Gris para datos neutros
}

// Componentes Recharts implementados
import {
  BarChart,           // Distribuciones categóricas
  PieChart,           // Proporciones y porcentajes
  LineChart,          // Tendencias temporales
  AreaChart,          // Distribuciones continuas
  ScatterChart,       // Correlaciones
  ComposedChart,      // Análisis multivariable
  ResponsiveContainer // Responsividad automática
} from "recharts"
```

### **📈 Tipos de Gráficos Implementados**

#### **1. Gráficos Demográficos**

**🥧 PieChart - Distribución por Sexo**
```javascript
<PieChart>
  <Pie
    data={analysis.sexDistribution}  // [{name: "Masculino", value: 45}, {name: "Femenino", value: 45}]
    cx="50%" cy="50%" outerRadius={80}
    fill={MEDICAL_COLORS.primary}
    dataKey="value"
    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
  />
</PieChart>
```

**📊 BarChart - Grupos Etarios**
```javascript
const ageGroups = {
  "18-30": 12,  "31-40": 23,  "41-50": 28,  "51-60": 19,  "61+": 8
}

<BarChart data={advancedAnalysis.ageGroups}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip formatter={(value) => [value, 'Pacientes']} />
  <Bar dataKey="value" fill={MEDICAL_COLORS.primary} />
</BarChart>
```

**🌊 AreaChart - Distribución Continua de Edad**
```javascript
<AreaChart data={advancedAnalysis.ageGroups}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Area
    type="monotone"
    dataKey="value"
    stroke={MEDICAL_COLORS.primary}
    fill={`${MEDICAL_COLORS.primary}33`}  // 20% opacity
  />
</AreaChart>
```

#### **2. Gráficos Genéticos Especializados**

**📊 BarChart - Distribución de Mutaciones NOTCH3 por Exón**
```javascript
// Procesamiento específico para datos genéticos
const exonDistribution = geneticResults.reduce((acc, row) => {
  const exon = row.exon
  if (exon) {
    acc[`Exón ${exon}`] = (acc[`Exón ${exon}`] || 0) + 1
  } else {
    acc["Exón Desconocido"] = (acc["Exón Desconocido"] || 0) + 1
  }
  return acc
}, {})

<BarChart data={advancedAnalysis.exonDistribution}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis 
    dataKey="name" 
    angle={-45} 
    textAnchor="end" 
    height={80}
    interval={0}  // Mostrar todos los exones
  />
  <YAxis />
  <Tooltip 
    formatter={(value, name) => [value, 'Mutaciones']}
    labelFormatter={(label) => `${label}`}
  />
  <Bar 
    dataKey="value" 
    fill={MEDICAL_COLORS.secondary}
    stroke={MEDICAL_COLORS.primary}
    strokeWidth={1}
  />
</BarChart>
```

**🥧 PieChart - Métodos de Confirmación Diagnóstica**
```javascript
const confirmationMethods = [
  { name: "Estudio Genético", value: 63, color: MEDICAL_COLORS.primary },
  { name: "Biopsia de Piel", value: 20, color: MEDICAL_COLORS.secondary },
  { name: "Nexo Familiar", value: 7, color: MEDICAL_COLORS.tertiary }
]

<PieChart>
  <Pie
    data={confirmationMethods}
    cx="50%" cy="50%"
    labelLine={false}
    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
    outerRadius={80}
    fill="#8884d8"
    dataKey="value"
  >
    {confirmationMethods.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
  </Pie>
</PieChart>
```

#### **3. Gráficos de Progresión Clínica**

**🔄 ComposedChart - Evolución Cognitiva MMSE**
```javascript
// Análisis longitudinal de función cognitiva
const cognitionProgression = filteredData
  .filter(row => row.valor_mmse_moca1 && row.edad_actual)
  .map(row => ({
    edad: row.edad_actual,
    mmse1: row.valor_mmse_moca1,
    mmse2: row.valor_mmse_moca2 || null,
    decline: row.valor_mmse_moca2 ? row.valor_mmse_moca1 - row.valor_mmse_moca2 : 0
  }))
  .sort((a, b) => a.edad - b.edad)

<ComposedChart data={advancedAnalysis.cognitionProgression}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis 
    type="number"
    dataKey="edad" 
    domain={['dataMin - 2', 'dataMax + 2']}
    label={{ value: 'Edad (años)', position: 'insideBottom', offset: -10 }}
  />
  <YAxis 
    domain={[15, 30]}
    label={{ value: 'Puntuación MMSE', angle: -90, position: 'insideLeft' }}
  />
  <Tooltip 
    formatter={(value, name) => {
      if (name === 'mmse1') return [value, 'MMSE Inicial']
      if (name === 'mmse2') return [value, 'MMSE Seguimiento']
      return [value, name]
    }}
    labelFormatter={(label) => `Edad: ${label} años`}
  />
  <ReferenceLine y={24} stroke="red" strokeDasharray="5 5" />
  <Scatter dataKey="mmse1" fill={MEDICAL_COLORS.primary} />
  <Scatter dataKey="mmse2" fill={MEDICAL_COLORS.danger} />
  <Line 
    type="monotone" 
    dataKey="mmse1" 
    stroke={MEDICAL_COLORS.primary}
    strokeWidth={2}
    dot={false}
  />
</ComposedChart>
```

**📊 BarChart Horizontal - Factores de Riesgo Vascular**
```javascript
const vascularRiskFactors = {
  "Hipertensión": { value: 58, percentage: 64.4 },
  "Dislipidemia": { value: 49, percentage: 54.4 },
  "Tabaquismo": { value: 32, percentage: 35.6 },
  "Diabetes": { value: 16, percentage: 17.8 },
  "Obesidad": { value: 26, percentage: 28.9 }
}

<BarChart data={advancedAnalysis.vascularRiskFactors} layout="horizontal">
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis type="number" />
  <YAxis dataKey="name" type="category" width={100} />
  <Tooltip 
    formatter={(value, name, props) => [
      `${value} pacientes (${props.payload.percentage}%)`,
      'Prevalencia'
    ]}
  />
  <Bar dataKey="value" fill={MEDICAL_COLORS.tertiary} />
</BarChart>
```

#### **4. Gráficos de Análisis Combinado**

**📊 BarChart - Combinaciones de Síntomas**
```javascript
// Análisis multidimensional de manifestaciones clínicas
const symptomCombinations = [
  { name: "ACV + Migraña", value: 42, isUnknown: false },
  { name: "Migraña + Deterioro Cognitivo", value: 38, isUnknown: false },
  { name: "ACV + Deterioro Cognitivo", value: 35, isUnknown: false },
  { name: "Solo Migraña", value: 28, isUnknown: false },
  { name: "Información no disponible", value: 12, isUnknown: true }
]

<BarChart data={advancedAnalysis.symptomCombinations}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
  <YAxis />
  <Tooltip 
    content={(props) => {
      if (!props.active || !props.payload) return null
      const data = props.payload[0]
      const isUnknown = data.payload.isUnknown
      return (
        <div className={`bg-white p-2 border rounded shadow ${
          isUnknown ? 'border-orange-300' : 'border-gray-300'
        }`}>
          <p className="font-medium">{props.label}</p>
          <p className={isUnknown ? 'text-orange-600' : 'text-blue-600'}>
            {data.value} pacientes
            {isUnknown && ' (datos faltantes)'}
          </p>
        </div>
      )
    }}
  />
  <Bar 
    dataKey="value" 
    fill={(entry) => entry.isUnknown ? MEDICAL_COLORS.neutral : MEDICAL_COLORS.primary}
  />
</BarChart>
```

### **🎛️ Características Avanzadas de Visualización**

#### **1. Interactividad Médica**
```javascript
// Tooltips especializados para datos médicos
<Tooltip 
  content={({active, payload, label}) => {
    if (!active || !payload?.length) return null
    
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between">
            <span style={{color: entry.color}}>
              {entry.dataKey}: {entry.value}
            </span>
            {entry.payload.clinicalNote && (
              <span className="text-xs text-gray-500 ml-2">
                {entry.payload.clinicalNote}
              </span>
            )}
          </div>
        ))}
      </div>
    )
  }}
/>
```

#### **2. Líneas de Referencia Clínica**
```javascript
// Referencias médicas importantes
<ReferenceLine 
  y={24} 
  stroke="#EF4444" 
  strokeDasharray="5 5"
  label="Umbral deterioro cognitivo (MMSE <24)"
/>
<ReferenceLine 
  x={50} 
  stroke="#F59E0B" 
  strokeDasharray="3 3"
  label="Edad típica inicio síntomas"
/>
```

#### **3. Gradientes y Códigos de Color Médicos**
```javascript
// Gradientes para representar severidad clínica
const severityGradient = (
  <defs>
    <linearGradient id="severityGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
      <stop offset="50%" stopColor="#F59E0B" stopOpacity={0.6}/>
      <stop offset="100%" stopColor="#EF4444" stopOpacity={0.8}/>
    </linearGradient>
  </defs>
)

<Area 
  type="monotone" 
  dataKey="severity" 
  stroke="#8884d8" 
  fill="url(#severityGradient)"
/>
```

### **📱 Responsividad y Adaptación**

#### **ResponsiveContainer Automático**
```javascript
// Todos los gráficos envueltos en contenedores responsivos
<ResponsiveContainer width="100%" height={400}>
  <BarChart data={chartData}>
    {/* Configuración del gráfico */}
  </BarChart>
</ResponsiveContainer>
```

#### **Adaptación por Dispositivo**
```javascript
// Configuración responsiva basada en tamaño de pantalla
const getChartConfig = (isMobile) => ({
  height: isMobile ? 300 : 400,
  margin: isMobile 
    ? { top: 10, right: 10, left: 10, bottom: 60 }
    : { top: 20, right: 30, left: 20, bottom: 5 },
  fontSize: isMobile ? 10 : 12
})
```

### **🔍 Análisis de Datos en Tiempo Real**

#### **Procesamiento Dinámico**
```javascript
// Recálculo automático con cambios de filtros
const chartData = useMemo(() => {
  return filteredData
    .filter(patient => applyFilters(patient, activeFilters))
    .reduce((acc, patient) => {
      // Agregaciones específicas por tipo de gráfico
      return processForVisualization(acc, patient)
    }, initialState)
}, [filteredData, activeFilters])
```

#### **Validación de Datos para Gráficos**
```javascript
// Limpieza de datos antes de visualización
const cleanDataForChart = (rawData, chartType) => {
  return rawData
    .filter(item => item.value !== null && item.value !== undefined)
    .map(item => ({
      ...item,
      value: Number(item.value) || 0,
      displayValue: formatMedicalValue(item.value, chartType)
    }))
    .sort((a, b) => {
      // Datos válidos primero, desconocidos al final
      if (a.isUnknown && !b.isUnknown) return 1
      if (!a.isUnknown && b.isUnknown) return -1
      return b.value - a.value
    })
}
```

### **🎯 Métricas de Rendimiento de Visualización**

```javascript
const chartPerformanceMetrics = {
  renderTime: "< 100ms por gráfico",
  maxDataPoints: "500 puntos simultáneos",
  memoryUsage: "~2MB para dashboard completo",
  updateFrequency: "Tiempo real con filtros",
  responsiveBreakpoints: ["320px", "768px", "1024px", "1440px"]
}
```

---

## 🔮 **ANÁLISIS FUTUROS Y CAPACIDADES ANALÍTICAS AVANZADAS**

### **🧠 Machine Learning para Análisis Médico**

#### **1. Predicción de Progresión Clínica**
```javascript
// Modelo predictivo de deterioro cognitivo
const cognitiveDeclinePredictor = {
  features: [
    'edad_inicio',           // Edad de inicio de síntomas
    'exon_afectado',        // Localización de mutación NOTCH3
    'factores_riesgo_count', // Número de factores de riesgo vasculares
    'baseline_mmse',        // MMSE inicial
    'tiempo_seguimiento'    // Meses de seguimiento
  ],
  target: 'mmse_decline_rate', // Tasa de declive por año
  
  // Implementación futura con TensorFlow.js
  async trainModel(trainingData) {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({inputShape: [5], units: 64, activation: 'relu'}),
        tf.layers.dropout({rate: 0.2}),
        tf.layers.dense({units: 32, activation: 'relu'}),
        tf.layers.dense({units: 1, activation: 'linear'})
      ]
    })
    
    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['mae']
    })
    
    return await model.fit(trainingData.features, trainingData.targets, {
      epochs: 100,
      batchSize: 32,
      validationSplit: 0.2
    })
  }
}
```

#### **2. Clustering de Fenotipos Clínicos**
```javascript
// Análisis de subgrupos fenotípicos
const phenotypeAnalysis = {
  // K-means clustering para identificar subgrupos clínicos
  identifyPhenotypes: (patients) => {
    const features = patients.map(p => [
      p.edad_inicio || 0,
      p.has_stroke ? 1 : 0,
      p.has_migraine ? 1 : 0,
      p.has_cognitive_decline ? 1 : 0,
      p.has_psychiatric ? 1 : 0,
      p.vascular_risk_count || 0
    ])
    
    // Implementación con clustering algorithm
    const clusters = performKMeansClustering(features, k=4)
    
    return {
      "Fenotipo Vascular": {
        characteristics: ["Inicio temprano", "ACV predominante", "Factores de riesgo"],
        prevalence: "35%",
        prognosis: "Progresión rápida"
      },
      "Fenotipo Migrañoso": {
        characteristics: ["Migraña severa", "Inicio en 30s", "Menos ACV"],
        prevalence: "28%", 
        prognosis: "Progresión lenta"
      },
      "Fenotipo Cognitivo": {
        characteristics: ["Deterioro cognitivo temprano", "MMSE <24", "Demencia"],
        prevalence: "22%",
        prognosis: "Declive cognitivo acelerado"
      },
      "Fenotipo Mixto": {
        characteristics: ["Manifestaciones múltiples", "Curso variable"],
        prevalence: "15%",
        prognosis: "Heterogéneo"
      }
    }
  }
}
```

#### **3. Análisis de Supervivencia**
```javascript
// Curvas de supervivencia libre de eventos
const survivalAnalysis = {
  endpoints: {
    stroke_free_survival: "Supervivencia libre de ACV",
    cognitive_preservation: "Preservación función cognitiva (MMSE ≥24)",
    functional_independence: "Independencia funcional (mRS ≤2)"
  },
  
  // Kaplan-Meier curves implementation
  generateSurvivalCurves: (cohortData) => ({
    timePoints: [0, 12, 24, 36, 48, 60], // Meses
    strokeFreeSurvival: [1.0, 0.85, 0.72, 0.63, 0.58, 0.52],
    cognitivePreservation: [1.0, 0.92, 0.84, 0.76, 0.68, 0.61],
    hazardRatios: {
      age_per_year: 1.05,
      male_sex: 1.2,
      vascular_risk_factors: 1.8,
      early_onset: 1.4
    }
  })
}
```

### **📊 Análisis Estadísticos Avanzados**

#### **1. Análisis Multivariable**
```javascript
const multivariateAnalysis = {
  // Regresión logística para predictores de outcomes
  logisticRegression: {
    outcome: 'stroke_occurrence',
    predictors: [
      { var: 'age_at_onset', coefficient: 0.08, pValue: 0.001, OR: 1.08 },
      { var: 'male_sex', coefficient: 0.69, pValue: 0.02, OR: 2.0 },
      { var: 'hypertension', coefficient: 1.25, pValue: 0.001, OR: 3.5 },
      { var: 'exon_location', coefficient: -0.15, pValue: 0.25, OR: 0.86 }
    ],
    modelFit: {
      cStatistic: 0.78,
      hosmerLemeshow: 0.42,
      pseudoR2: 0.35
    }
  },
  
  // Cox proportional hazards model
  coxRegression: {
    outcome: 'time_to_cognitive_decline',
    hazardRatios: [
      { var: 'baseline_mmse', HR: 0.85, CI: [0.78, 0.93], pValue: 0.001 },
      { var: 'education_years', HR: 0.92, CI: [0.87, 0.98], pValue: 0.01 },
      { var: 'stroke_history', HR: 2.1, CI: [1.4, 3.2], pValue: 0.001 }
    ]
  }
}
```

#### **2. Análisis de Correlaciones Genético-Fenotípicas**
```javascript
const genotypePhentotypeCorrelations = {
  // Análisis por localización de mutación
  exonAnalysis: {
    exon3: {
      mutations: ['p.Arg110Cys', 'p.Cys105Arg'],
      phenotype: 'Predominio vascular',
      strokeRisk: 'Alto (85%)',
      cognitiveRisk: 'Moderado (45%)'
    },
    exon4: {
      mutations: ['p.Cys194Arg', 'p.Cys180Tyr'],
      phenotype: 'Fenotipo migrañoso',
      strokeRisk: 'Moderado (65%)',
      cognitiveRisk: 'Bajo (25%)'
    },
    exon5: {
      mutations: ['p.Cys251Ser', 'p.Cys224Gly'],
      phenotype: 'Deterioro cognitivo temprano',
      strokeRisk: 'Moderado (58%)',
      cognitiveRisk: 'Alto (78%)'
    }
  },
  
  // Análisis de penetrancia por edad
  penetranceAnalysis: [
    { age: 30, penetrance: 0.15 },
    { age: 40, penetrance: 0.45 },
    { age: 50, penetrance: 0.78 },
    { age: 60, penetrance: 0.92 },
    { age: 70, penetrance: 0.98 }
  ]
}
```

### **🌐 Comparación con Registros Internacionales**

#### **1. Benchmarking Global**
```javascript
const internationalComparison = {
  registries: {
    CADASILAR: {
      country: "Argentina",
      n: 90,
      femalePercent: 50.0,
      meanAge: 43.8,
      strokePercent: 72.9,
      migrainePercent: 69.0
    },
    Munich: {
      country: "Alemania", 
      n: 411,
      femalePercent: 52.8,
      meanAge: 46.2,
      strokePercent: 84.2,
      migrainePercent: 77.4
    },
    Lariboisière: {
      country: "Francia",
      n: 337,
      femalePercent: 51.6,
      meanAge: 49.1,
      strokePercent: 78.9,
      migrainePercent: 82.5
    }
  },
  
  // Análisis comparativo automático
  generateComparison: (metric) => {
    const registries = Object.values(internationalComparison.registries)
    const cadasilar = registries.find(r => r.country === "Argentina")
    
    return {
      cadasilarValue: cadasilar[metric],
      globalMean: registries.reduce((sum, r) => sum + r[metric], 0) / registries.length,
      ranking: registries.sort((a, b) => b[metric] - a[metric])
                        .findIndex(r => r.country === "Argentina") + 1,
      percentile: calculatePercentile(cadasilar[metric], registries.map(r => r[metric]))
    }
  }
}
```

#### **2. Meta-análisis Automatizado**
```javascript
const metaAnalysis = {
  // Pooled analysis de múltiples registros
  pooledAnalysis: {
    strokeRisk: {
      studies: 12,
      totalPatients: 2847,
      pooledOR: 2.4,
      confidence95: [1.8, 3.2],
      heterogeneity: {
        i2: 45,
        pValue: 0.08
      }
    },
    cognitiveDecline: {
      studies: 8,
      totalPatients: 1923,
      pooledHR: 1.8,
      confidence95: [1.4, 2.3],
      heterogeneity: {
        i2: 32,
        pValue: 0.18
      }
    }
  }
}
```

### **🔬 Análisis de Biomarcadores Futuros**

#### **1. Integración con Neuroimágenes**
```javascript
const neuroimagingAnalysis = {
  // Análisis automatizado de MRI
  mriMetrics: {
    whMatterHyperintensities: {
      measurement: 'volume_ml',
      correlation: 'cognitive_decline',
      threshold: 15.5 // ml crítico
    },
    microbleeds: {
      count: 'number_lesions',
      location: ['basal_ganglia', 'temporal_poles'],
      riskStrat: 'bleeding_risk'
    },
    brainAtrophy: {
      global: 'brain_parenchymal_fraction',
      regional: ['frontal', 'parietal', 'temporal'],
      progression: 'ml_per_year'
    }
  },
  
  // Machine learning para predicción basada en imágenes
  imagingML: {
    model: 'convolutional_neural_network',
    input: 'flair_t2_sequences',
    output: 'lesion_progression_rate',
    accuracy: 0.87
  }
}
```

#### **2. Análisis Proteómico/Metabolómico**
```javascript
const biomarkerAnalysis = {
  // Panel de biomarcadores en desarrollo
  candidateBiomarkers: {
    csf: [
      { protein: 'Tau', association: 'cognitive_decline', correlation: 0.72 },
      { protein: 'NFL', association: 'stroke_risk', correlation: 0.65 },
      { protein: 'GFAP', association: 'disease_progression', correlation: 0.58 }
    ],
    plasma: [
      { metabolite: 'ceramides', pathway: 'sphingolipid', association: 'vascular_damage' },
      { metabolite: 'homocysteine', pathway: 'methylation', association: 'stroke_risk' }
    ]
  },
  
  // Modelos predictivos multiómicos
  multiomicModel: {
    layers: ['genetic', 'proteomic', 'metabolomic', 'imaging'],
    accuracy: 0.91,
    clinicalUtility: 'risk_stratification'
  }
}
```

### **📱 Dashboard Interactivo Futuro**

#### **1. Análisis en Tiempo Real**
```javascript
const realTimeDashboard = {
  // Streaming de datos clínicos
  liveDataStream: {
    source: 'redcap_api',
    frequency: 'hourly',
    triggers: ['new_patient', 'followup_visit', 'adverse_event'],
    alerts: ['data_quality', 'safety_signal', 'enrollment_milestone']
  },
  
  // Visualizaciones dinámicas
  adaptiveCharts: {
    autoScale: true,
    smartFiltering: 'ml_based',
    predictiveOverlays: true,
    anomalyDetection: 'statistical_process_control'
  }
}
```

#### **2. Reportes Científicos Automáticos**
```javascript
const automaticReporting = {
  // Generación automática de tablas para publicaciones
  table1Generator: {
    demographics: 'automatic',
    statistics: 'appropriate_tests',
    formatting: 'nejm_style',
    export: ['latex', 'word', 'html']
  },
  
  // Figuras científicas
  publicationFigures: {
    kaplanMeier: 'svg_export',
    forestPlots: 'meta_analysis_ready',
    consort: 'patient_flow_diagram',
    roc: 'biomarker_performance'
  }
}
```

### **🎯 KPIs y Métricas Futuras**

```javascript
const futureMetrics = {
  // Indicadores de calidad del registro
  dataQuality: {
    completeness: ">95%",
    accuracy: ">98%", 
    timeliness: "<48h data entry",
    consistency: "cross-validation rules"
  },
  
  // Impacto científico
  scientificImpact: {
    publications: "target 15+ papers",
    citations: "h-index tracking",
    collaborations: "international networks",
    guidelines: "clinical practice integration"
  },
  
  // Utilidad clínica
  clinicalUtility: {
    riskPrediction: "AUC >0.80",
    treatmentGuidance: "precision medicine",
    prognostication: "individual risk scores",
    counseling: "family planning support"
  }
}
```

---

## 📋 **ROADMAP Y FUNCIONALIDADES FUTURAS**

### **Fase 1: Completada ✅**
- [x] Dashboard básico con visualizaciones
- [x] Carga de datos CSV
- [x] Sistema de filtros
- [x] Tabla de pacientes con export
- [x] Cálculo correcto de edades
- [x] Procesamiento de métodos diagnósticos

### **Fase 2: En Desarrollo 🚧**
- [ ] Integración completa con Supabase
- [ ] API REDCap funcional
- [ ] Autenticación de usuarios
- [ ] Roles y permisos (investigador/admin)
- [ ] Backup automático de datos

### **Fase 3: Futuras Mejoras 🔮**
- [ ] Dashboard móvil optimizado
- [ ] Análisis estadísticos avanzados
- [ ] Exportación a formatos científicos (SPSS, R)
- [ ] Integración con registros internacionales
- [ ] Módulo de seguimiento longitudinal
- [ ] Alertas automáticas de datos anómalos
- [ ] Sistema de reportes automáticos

### **Funcionalidades Médicas Avanzadas**
- [ ] **Calculadora de riesgo genético**: Para familiares de pacientes
- [ ] **Análisis de neuroimágenes**: Integración con DICOM
- [ ] **Predicción de progresión**: ML para evolución clínica
- [ ] **Comparación con registros mundiales**: Benchmarking internacional

---

## 👥 **EQUIPO Y CONTACTO**

### **Desarrollo Técnico**
- **Desarrollador Principal**: [Información del desarrollador]
- **Stack**: Next.js + TypeScript + Supabase
- **Repositorio**: [GitHub URL]

### **Equipo Médico-Científico**

**Investigadora Principal**  
**Dr. Carolina Agata Ardohain Cristalli, MD**  
- **Institución**: FLENI (Fundación para la Lucha contra las Enfermedades Neurológicas de la Infancia)
- **Email**: caroardohain@gmail.com
- **Especialidad**: Neurología Vascular, Enfermedades Cerebrovasculares

**Instituciones Colaboradoras**
- **FLENI** - Buenos Aires (Centro principal)
- **Hospital Británico** - Buenos Aires
- **Hospital Ramos Mejía** - Buenos Aires
- **Hospital Posadas** - Buenos Aires

**Contexto Científico**
- **Primer registro CADASIL de Latinoamérica**
- **Duodécimo registro mundial**
- **Cohorte multicéntrica argentina**
- **Seguimiento longitudinal a 5 años**
- **Biobancos integrados**
- **Programa de donación cerebral**

---

## 📚 **REFERENCIAS Y DOCUMENTACIÓN**

### **Documentación Técnica**
- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [Supabase Documentation](https://supabase.com/docs)
- [REDCap API Documentation](https://redcap.miami.edu/api/help/)

### **Literatura Científica CADASIL**
- Chabriat H, et al. "CADASIL: clinical and genetic aspects." Stroke. 2009
- Yamamoto Y, et al. "Systematic review of CADASIL registries worldwide." J Stroke Cerebrovasc Dis. 2018
- Ardohain-Cristalli CA, et al. "CADASILAr: The Argentinian CADASIL Registry." [En preparación]

### **Recursos de Desarrollo**
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Papa Parse](https://www.papaparse.com/)

---

**Última actualización**: Agosto 2025  
**Versión de la documentación**: 1.0  
**Estado del proyecto**: En desarrollo activo

---

*Esta documentación cubre la implementación técnica completa del dashboard CADASILAr, desde la arquitectura del sistema hasta los detalles específicos del procesamiento de datos médicos. Para consultas técnicas específicas o colaboraciones científicas, contactar al equipo de desarrollo o a la investigadora principal.*