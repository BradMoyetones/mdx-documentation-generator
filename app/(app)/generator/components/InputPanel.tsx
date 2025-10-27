"use client"

import type React from "react"
import type { ProjectData, FeatureCard } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, SparklesIcon, TrashIcon } from "lucide-react"

interface InputPanelProps {
  projectData: ProjectData
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>
  onGenerate: () => void
  onClear: () => void
  isLoading: boolean
}

export default function InputPanel({ projectData, setProjectData, onGenerate, onClear, isLoading }: InputPanelProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProjectData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDynamicListChange = (
    listName: "backendStack" | "frontendStack" | "benefits",
    index: number,
    value: string,
  ) => {
    const newList = [...projectData[listName]]
    newList[index] = value
    setProjectData((prev) => ({ ...prev, [listName]: newList }))
  }

  const addDynamicListItem = (listName: "backendStack" | "frontendStack" | "benefits") => {
    setProjectData((prev) => ({ ...prev, [listName]: [...prev[listName], ""] }))
  }

  const removeDynamicListItem = (listName: "backendStack" | "frontendStack" | "benefits", index: number) => {
    const newList = projectData[listName].filter((_, i) => i !== index)
    setProjectData((prev) => ({
      ...prev,
      [listName]: newList.length > 0 ? newList : [""],
    }))
  }

  const handleFeatureChange = (index: number, field: keyof FeatureCard, value: string) => {
    const newFeatures = [...projectData.mainFeatures]
    newFeatures[index][field] = value
    setProjectData((prev) => ({ ...prev, mainFeatures: newFeatures }))
  }

  const addFeature = () => {
    setProjectData((prev) => ({
      ...prev,
      mainFeatures: [...prev.mainFeatures, { title: "", description: "" }],
    }))
  }

  const removeFeature = (index: number) => {
    const newFeatures = projectData.mainFeatures.filter((_, i) => i !== index)
    setProjectData((prev) => ({
      ...prev,
      mainFeatures: newFeatures.length > 0 ? newFeatures : [{ title: "", description: "" }],
    }))
  }

  const DynamicList: React.FC<{
    listName: "backendStack" | "frontendStack" | "benefits"
    placeholder: string
    label: string
  }> = ({ listName, placeholder, label }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="space-y-2">
        {projectData[listName].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="text"
              value={item}
              onChange={(e) => handleDynamicListChange(listName, index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              onClick={() => removeDynamicListItem(listName, index)}
              disabled={projectData[listName].length === 1 && projectData[listName][0] === ""}
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={() => addDynamicListItem(listName)} variant="outline" size="sm" className="w-full">
        <PlusIcon className="w-4 h-4 mr-2" />
        Add {label.slice(0, -1)}
      </Button>
    </div>
  )

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-6 py-2 border-b border-border">
        <h2 className="text-lg font-semibold">Project Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Fill in your project information to generate documentation</p>
      </div>

      <div className="flex-grow overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
              placeholder="e.g., Hoteles"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              rows={2}
              placeholder="A short summary for the doc's metadata"
            />
          </div>
        </div>

        <Separator />

        {/* Problem & Solution */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problemStatement">The Problem</Label>
            <Textarea
              id="problemStatement"
              name="problemStatement"
              value={projectData.problemStatement}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe the problem this project solves"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="solution">The Solution</Label>
            <Textarea
              id="solution"
              name="solution"
              value={projectData.solution}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe how the project solves the problem"
            />
          </div>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Badge variant="secondary">Tech Stack</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DynamicList listName="backendStack" placeholder="e.g., PHP, Slim Framework" label="Backend Technologies" />
            <DynamicList listName="frontendStack" placeholder="e.g., React 18, Vite" label="Frontend Technologies" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Badge variant="secondary">Main Features</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectData.mainFeatures.map((feature, index) => (
              <Card key={index} className="relative bg-muted/50">
                <CardContent className="pt-6 space-y-3">
                  <Input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                    placeholder="Feature Title"
                  />
                  <Textarea
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                    placeholder="Feature Description"
                    rows={2}
                  />
                  <Button
                    onClick={() => removeFeature(index)}
                    disabled={projectData.mainFeatures.length === 1}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button onClick={addFeature} variant="outline" size="sm" className="w-full bg-transparent">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Feature Card
            </Button>
          </CardContent>
        </Card>

        {/* Benefits */}
        <DynamicList listName="benefits" placeholder="e.g., Efficiency, Error reduction" label="Benefits" />
      </div>

      <div className="px-6 py-4 border-t border-border bg-card/50 flex gap-3">
        <Button
          onClick={onGenerate}
          disabled={isLoading || !projectData.name || !projectData.description}
          className="flex-1"
          size="lg"
        >
          <SparklesIcon className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Generating..." : "Generate Docs"}
        </Button>
        <Button onClick={onClear} disabled={isLoading} variant="outline" size="lg">
          Clear
        </Button>
      </div>
    </div>
  )
}
