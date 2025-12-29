// import React, { useContext } from "react";
// import { ThemeContext } from "../../ThemeProvider";

// const PublishModal = ({
//     onClose,
//     onConnectDomain,
//     onCustomDomain,
//     onSubDomain
// }) => {
//     const { theme } = useContext(ThemeContext);

//     // 🔁 INVERTED
//     const isDarkUI = theme !== "dark";

//     return (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
//             <div
//                 className={`
//                     w-[90%] max-w-sm rounded-2xl p-6 border shadow-2xl
//                     ${isDarkUI
//                         ? "bg-gradient-to-b from-[#0f0f0f] to-[#050505] border-white/10 text-white"
//                         : "bg-white border-gray-200 text-black"
//                     }
//                 `}
//             >
//                 <h2 className="text-xl font-semibold mb-1">
//                     Publish
//                 </h2>

//                 <p
//                     className={`text-sm mb-6 ${isDarkUI ? "text-gray-400" : "text-gray-600"}`}
//                 >
//                     You have successfully published your work.
//                 </p>

//                 <div className="space-y-3">
//                     <ActionButton
//                         label="+ Connect Your Domain"
//                         onClick={onConnectDomain}
//                         isDarkUI={isDarkUI}
//                     />

//                     <ActionButton
//                         label="+ Get A Custom Domain"
//                         onClick={onCustomDomain}
//                         isDarkUI={isDarkUI}
//                     />

//                     <ActionButton
//                         label="+ Sub Domain"
//                         onClick={onSubDomain}
//                         isDarkUI={isDarkUI}
//                     />
//                 </div>

//                 <button
//                     onClick={onClose}
//                     className={`mt-6 text-sm transition ${isDarkUI
//                         ? "text-gray-400 hover:text-white"
//                         : "text-gray-500 hover:text-black"
//                         }`}
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PublishModal;

// /* ================= Helper ================= */

// const ActionButton = ({ label, onClick, isDarkUI }) => (
//     <button
//         onClick={onClick}
//         className={`
//             w-full flex items-center gap-3 px-4 py-3 rounded-lg transition border text-sm
//             ${isDarkUI
//                 ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
//                 : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-black"
//             }
//         `}
//     >
//         {label}
//     </button>
// );





import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
const PublishModal = ({
    onClose,
    onConnectDomain,
    onCustomDomain,
    onSubDomain
}) => {
    const { theme } = useContext(ThemeContext);
    // :repeat: INVERTED
    const isDarkUI = theme !== "dark";
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                className={`
                    w-[90%] max-w-sm rounded-2xl p-6 border shadow-2xl
                    ${isDarkUI
                        ? "bg-gradient-to-b from-[#0F0F0F] to-[#050505] border-white/10 text-white"
                        : "bg-white border-gray-200 text-black"
                    }
                `}
            >
                <h2 className="text-xl font-semibold mb-1">
                    Publish
                </h2>
                <p
                    className={`text-sm mb-6 ${isDarkUI ? "text-gray-400" : "text-gray-600"}`}
                >
                    You have successfully published your work.
                </p>
                <div className="space-y-3">
                    <ActionButton
                        label="+ Connect Your Domain"
                        onClick={onConnectDomain}
                        isDarkUI={isDarkUI}
                    />
                    <ActionButton
                        label="+ Get A Custom Domain"
                        onClick={onCustomDomain}
                        isDarkUI={isDarkUI}
                    />
                    <ActionButton
                        label="+ Sub Domain"
                        onClick={onSubDomain}
                        isDarkUI={isDarkUI}
                    />
                </div>
                <button
                    onClick={onClose}
                    className={`mt-6 text-sm transition ${isDarkUI
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-black"
                        }`}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
export default PublishModal;
/* ================= Helper ================= */
const ActionButton = ({ label, onClick, isDarkUI }) => (
    <button
        onClick={onClick}
        className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-lg transition border text-sm
            ${isDarkUI
                ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-black"
            }
        `}
    >
        {label}
    </button>
);