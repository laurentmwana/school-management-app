"use client"

import type React from "react"
import { useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Bold, Italic, Link, ImageIcon, List, Heading1 } from "lucide-react"

interface MarkdownTextareaProps {
  id?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
}

export const MarkdownTextarea = ({
  id,
  name,
  placeholder = "Écrivez votre contenu ici...",
  defaultValue = "",
  className,
  onChange,
}: MarkdownTextareaProps) => {
  const [content, setContent] = useState(defaultValue)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const insertText = (before: string, after = "") => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    setContent(newText)
    if (onChange) {
      onChange(newText)
    }

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const formatActions = [
    {
      icon: <Bold className="h-4 w-4" />,
      title: "Gras",
      action: () => insertText("**", "**"),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      title: "Italique",
      action: () => insertText("*", "*"),
    },
    {
      icon: <Heading1 className="h-4 w-4" />,
      title: "Titre",
      action: () => insertText("# "),
    },
    {
      icon: <Link className="h-4 w-4" />,
      title: "Lien",
      action: () => {
        const selectedText = content.substring(
          textareaRef.current?.selectionStart || 0,
          textareaRef.current?.selectionEnd || 0,
        )
        if (selectedText) {
          insertText("[", "](url)")
        } else {
          insertText("[texte](url)")
        }
      },
    },
    {
      icon: <ImageIcon className="h-4 w-4" />,
      title: "Image",
      action: () => insertText("![alt](", ")"),
    },
    {
      icon: <List className="h-4 w-4" />,
      title: "Liste",
      action: () => insertText("- "),
    },
  ]

  return (
    <div className={cn("w-full my-2", className)}>
      <Tabs defaultValue="write" className="w-full">
        <div className="flex items-center justify-between border-b">
          <TabsList className="h-auto p-0 bg-transparent">
            <TabsTrigger
              value="write"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Écrire
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Aperçu
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="mt-0">
          <div className="border-b bg-muted/30 px-2 py-1">
            <div className="flex flex-wrap gap-1">
              {formatActions.map((action, index) => (
                <Button
                  type="button"
                  key={index}
                  variant="ghost"
                  size="sm"
                  title={action.title}
                  onClick={action.action}
                  className="h-7 w-7 p-0 hover:bg-muted"
                >
                  {action.icon}
                  <span className="sr-only">{action.title}</span>
                </Button>
              ))}
            </div>
          </div>

          <Textarea
            ref={textareaRef}
            id={id}
            name={name}
            placeholder={placeholder}
            value={content}
            onChange={handleChange}
            className="min-h-[200px] resize-none rounded-none border-0 border-b focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm"
          />

          <div className="px-2 py-1 text-xs text-muted-foreground bg-muted/20 border-t">Markdown supporté</div>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="min-h-[200px] p-4 bg-background">
            {content ? (
              <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Rien à prévisualiser</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
