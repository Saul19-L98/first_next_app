import { TasksProvider } from '../context/tasksContext';
import {Toaster} from "./Toaster";
import {Navbar} from '../components/Navbar';
import { Layout } from '../components/Layout';
import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TasksProvider>
          <Navbar />
          <Layout>
            {children}
          </Layout>
          <Toaster />
        </TasksProvider>
      </body>
    </html>
  )
}
