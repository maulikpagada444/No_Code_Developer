import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Project API Service
 * Handles project save and fetch operations
 */
export const ProjectAPI = {
    /**
     * Save project to database and local folder
     * @param {Object} params - Save parameters
     * @param {string} params.sessionId - The session ID
     * @param {string} params.projectId - The project ID
     * @param {string} params.projectName - The project name
     * @param {string} params.htmlContent - The HTML content to save
     * @returns {Promise<Object>} Save result with folder path
     */
    async saveProject({ sessionId, projectId, projectName, htmlContent }) {
        const token = Cookies.get("access_token");

        const response = await fetch(`${BASE_URL}/project/save`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session_id: sessionId,
                project_id: projectId,
                project_name: projectName,
                html_content: htmlContent
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to save project');
        }

        return await response.json();
    },

    /**
     * Fetch project code from saved folder
     * @param {string} projectId - The project ID
     * @returns {Promise<Object>} Project data with code files
     */
    async fetchProjectCode(projectId) {
        const token = Cookies.get("access_token");

        const response = await fetch(`${BASE_URL}/project/${projectId}/files`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch project files');
        }

        return await response.json();
    },

    /**
     * Get project details including folder info
     * @param {string} projectId - The project ID
     * @returns {Promise<Object>} Project details
     */
    async getProjectDetails(projectId) {
        const token = Cookies.get("access_token");

        const response = await fetch(`${BASE_URL}/project/${projectId}/details`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch project details');
        }

        return await response.json();
    }
};

export default ProjectAPI;
