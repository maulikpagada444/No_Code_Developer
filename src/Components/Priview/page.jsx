// import { EditorProvider } from './Editor/EditorContext';
// import PreviewPanel from './Components/PreviewPanel';
// import PropertiesPanel from './Editor/PropertiesPanel';

// export default function Page() {
//     // ... state ...
//     return (
//         <EditorProvider>
//             <div className="flex h-screen">
//                 <PreviewPanel viewMode={viewMode} />
//                 {/* PropertiesPanel conditionally dikhana hai */}
//                 <PropertiesPanel />
//             </div>
//         </EditorProvider>
//     )
// }








import { EditorProvider } from './src/Editor/EditorContext';
import PreviewPanel from './src/Components/PreviewPanel';

export default function Home() {
    return (
        <EditorProvider>
            <PreviewPanel />
        </EditorProvider>
    );
}