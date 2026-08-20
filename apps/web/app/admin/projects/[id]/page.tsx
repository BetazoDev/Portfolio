import { ProjectEditor } from '@/components/project-editor';
export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) { return <ProjectEditor id={(await params).id} />; }
