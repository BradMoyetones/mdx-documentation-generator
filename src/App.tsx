import { useState, useCallback } from "react"
import type { ProjectData } from "@/types"
import { generateMdxDocumentation } from "@/services/geminiService"
import InputPanel from "@/components/InputPanel"
import OutputPanel from "@/components/OutputPanel"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import SiteHeader from "./components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function App() {
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    description: "",
    problemStatement: "",
    solution: "",
    backendStack: [""],
    frontendStack: [""],
    mainFeatures: [{ title: "", description: "" }],
    benefits: [""],
  })
  const [generatedMdx, setGeneratedMdx] = useState<string>(`---
title: Almuerzos
description: Este sistema es una herramienta esencial para la gestión diaria y eficiente del registro de almuerzos del personal, optimizando la planificación gastronómica al cuantificar los menús requeridos y agilizando la distribución de las tres opciones disponibles.
---

## Descripción del Proyecto

El proyecto **Almuerzos** es una aplicación web integral diseñada para transformar la gestión del registro diario de comidas para todo el personal. Su objetivo principal es optimizar la planificación gastronómica, permitiendo un control preciso sobre la cantidad de almuerzos a servir y la distribución de los tres tipos de menú disponibles. Al centralizar y automatizar este proceso, el sistema no solo agiliza las operaciones diarias sino que también garantiza una asignación eficiente de recursos y una experiencia mejorada para los usuarios.

## Problemática Anterior

Previamente, la gestión de los registros de almuerzos se realizaba de forma rudimentaria, principalmente a través de comunicaciones por WhatsApp. Este método manual presentaba serias deficiencias, generando una serie de inconvenientes operativos. La verificación de registros era propensa a inconsistencias, lo que resultaba en conteos inexactos y demoras significativas en el proceso de consolidación. Esta falta de un sistema estructurado dificultaba la trazabilidad y la auditoría, impactando negativamente la eficiencia y la fiabilidad de la gestión de almuerzos.

<Callout className="mt-6 mb-6 border-yellow-600 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950 [&_code]:bg-yellow-100 dark:[&_code]:bg-yellow-900">
  La dependencia de métodos manuales como WhatsApp resultaba en **inconsistencias en los conteos**, **demoras significativas en la verificación** de registros y una **falta de trazabilidad** clara, impactando negativamente la eficiencia operativa y la satisfacción del personal.
</Callout>

## Solución Implementada

Para abordar estas problemáticas, se desarrolló una aplicación robusta que automatiza y centraliza el control de almuerzos. Esta solución permite contabilizar cada registro de manera detallada, categorizando por restaurante, tipo de menú y persona. Además, se integra de forma transparente con otra aplicación, **Ecotrueque**, para realizar descuentos automáticos de gramos de peso, eliminando por completo la necesidad de un control manual de estos procesos. El resultado es un sistema eficiente, preciso y libre de las inconsistencias asociadas a los métodos tradicionales.

## Stack Tecnológico

### Backend
*   **PHP**
*   **Slim Framework**
*   **Eloquent ORM**
*   **Blade**
*   **JWT**

### Frontend
*   **React 18**
*   **Vite**
*   **TypeScript**
*   **shadcn/ui**
*   **Tailwind CSS**

## Características Principales

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-2">Registro Centralizado de Almuerzos</h3>
    <p className="text-sm text-muted-foreground">
      Plataforma intuitiva para que cada integrante del personal registre su opción de almuerzo diario de manera rápida y sencilla.
    </p>
  </div>
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-2">Gestión Gastronómica Inteligente</h3>
    <p className="text-sm text-muted-foreground">
      Herramientas para que el equipo de cocina anticipe la demanda, planifique la preparación de los 3 tipos de menú y optimice recursos.
    </p>
  </div>
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-2">Integración con Ecotrueque</h3>
    <p className="text-sm text-muted-foreground">
      Sincronización automática con la aplicación Ecotrueque para el descuento preciso de gramos de peso, eliminando procesos manuales.
    </p>
  </div>
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-2">Reportes Detallados y Análisis</h3>
    <p className="text-sm text-muted-foreground">
      Generación de informes exhaustivos por restaurante, tipo de menú y usuario para una visión clara y toma de decisiones informada.
    </p>
  </div>
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-2">Eliminación de Procesos Manuales</h3>
    <p className="text-sm text-muted-foreground">
      Automatización completa del registro y conteo, reduciendo la carga administrativa y minimizando errores humanos.
    </p>
  </div>
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-2">Interfaz de Usuario Intuitiva</h3>
    <p className="text-sm text-muted-foreground">
      Diseño moderno y responsivo que asegura una experiencia de usuario fluida y accesible desde cualquier dispositivo.
    </p>
  </div>
</div>

## Beneficios

*   **Precisión y Eficiencia en el Conteo:** Elimina errores manuales y agiliza el proceso de contabilización de almuerzos.
*   **Optimización de la Gestión Gastronómica:** Permite una mejor planificación de recursos, reduce el desperdicio y asegura la disponibilidad de menús.
*   **Ahorro de Tiempo Operacional:** Reduce significativamente el tiempo dedicado a la gestión y verificación de registros diarios.
*   **Trazabilidad y Transparencia:** Proporciona acceso a datos claros y verificables sobre los registros de almuerzos, mejorando la auditoría.
*   **Mejora de la Experiencia del Usuario:** Ofrece un sistema fácil de usar para el registro diario, aumentando la satisfacción del personal.

## Próximos Pasos

<Steps>
  <Step>Explorar la API</Step>
  Conoce todos los endpoints disponibles en la <Link href="/almuerzos/docs/api">documentación de la API</Link>.

  <Step>Revisar el Frontend</Step>
  Descubre la arquitectura y componentes del frontend en la <Link href="/almuerzos/docs/front-end">documentación del Frontend</Link>.

  <Step>Guías de Usuario</Step>
  Consulta las guías específicas para cada rol de usuario en el sistema.
</Steps>`)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setGeneratedMdx("")
    try {
      const result = await generateMdxDocumentation(projectData)
      setGeneratedMdx(result)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`An error occurred: ${e.message}`)
      } else {
        setError("An unknown error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }, [projectData])

  const handleClear = () => {
    setProjectData({
      name: "",
      description: "",
      problemStatement: "",
      solution: "",
      backendStack: [""],
      frontendStack: [""],
      mainFeatures: [{ title: "", description: "" }],
      benefits: [""],
    })
    setGeneratedMdx("")
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="grow h-[calc(100vh-53px)]">
        <div className="md:hidden h-full">
          <Tabs defaultValue="input" className="h-full flex flex-col gap-0">
            <TabsList className="w-full rounded-none border-b border-border bg-muted/50">
              <TabsTrigger value="input" className="flex-1">
                Input
              </TabsTrigger>
              <TabsTrigger value="output" className="flex-1">
                Output
              </TabsTrigger>
            </TabsList>
            <TabsContent value="input" className="grow overflow-auto m-0">
              <InputPanel
                projectData={projectData}
                setProjectData={setProjectData}
                onGenerate={handleGenerate}
                onClear={handleClear}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="output" className="grow overflow-auto m-0">
              <OutputPanel mdxContent={generatedMdx} isLoading={isLoading} error={error} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden md:block h-full">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={45} minSize={30}>
              <InputPanel
                projectData={projectData}
                setProjectData={setProjectData}
                onGenerate={handleGenerate}
                onClear={handleClear}
                isLoading={isLoading}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={55} minSize={30}>
              <OutputPanel mdxContent={generatedMdx} isLoading={isLoading} error={error} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </div>
  )
}
