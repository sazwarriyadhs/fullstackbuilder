"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from '@/hooks/use-toast'

export default function DatabaseSettingsPage() {
  const [connectionType, setConnectionType] = useState("local")
  const { toast } = useToast()

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Settings Saved",
      description: "Your database connection settings have been updated.",
    })
  }

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader>
          <CardTitle>Database Connector</CardTitle>
          <CardDescription>
            Connect to either a local or an online database.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <RadioGroup 
            defaultValue="local" 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onValueChange={setConnectionType}
            value={connectionType}
          >
            <div>
              <RadioGroupItem value="local" id="local" className="peer sr-only" />
              <Label
                htmlFor="local"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Local Database
                <span className="text-xs text-muted-foreground mt-2">Connect to a database on your local machine.</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="online" id="online" className="peer sr-only" />
              <Label
                htmlFor="online"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Online Database
                <span className="text-xs text-muted-foreground mt-2">Connect to a cloud-hosted database.</span>
              </Label>
            </div>
          </RadioGroup>
          
          {connectionType === 'online' && (
             <div className="space-y-4 animate-in fade-in-50">
                <div className="space-y-2">
                    <Label htmlFor="connection-string">Connection String</Label>
                    <Input id="connection-string" placeholder="postgresql://user:password@host:port/database" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="db-user">Username</Label>
                        <Input id="db-user" placeholder="admin" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="db-password">Password</Label>
                        <Input id="db-password" type="password" />
                    </div>
                 </div>
            </div>
          )}

          {connectionType === 'local' && (
            <div className="text-center p-4 bg-muted rounded-lg animate-in fade-in-50">
                <p className="text-sm text-muted-foreground">Local database connection uses default settings. Ensure your local server is running.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit">Save</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
