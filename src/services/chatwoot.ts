
interface ChatwootContact {
    id: number;
    source_id: string;
    pubsub_token: string;
    name: string;
    email: string;
}

interface ChatwootConversation {
    id: number;
    contact_inbox: {
        source_id: string;
    };
    messages: any[];
}

const BASE_URL = import.meta.env.VITE_CHATWOOT_BASE_URL;
const INBOX_TOKEN = import.meta.env.VITE_CHATWOOT_INBOX_TOKEN;

export const chatwootService = {
    /**
     * Registra o recupera un contacto en Chatwoot usando el identificador de sesión
     */
    async registerContact(identifier: string, name?: string, email?: string): Promise<ChatwootContact> {
        if (!BASE_URL || !INBOX_TOKEN) {
            throw new Error("Chatwoot configuration missing");
        }

        const response = await fetch(`${BASE_URL}/public/api/v1/inboxes/${INBOX_TOKEN}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier,
                name: name || `User ${identifier.slice(0, 6)}`,
                email: email,
            }),
        });

        if (!response.ok) {
            const error = new Error("Failed to register contact");
            (error as any).status = response.status;
            throw error;
        }

        return response.json();
    },

    /**
     * Crea una nueva conversación para un contacto (source_id)
     */
    async createConversation(sourceId: string): Promise<ChatwootConversation> {
        if (!BASE_URL || !INBOX_TOKEN) {
            throw new Error("Chatwoot configuration missing");
        }

        const response = await fetch(`${BASE_URL}/public/api/v1/inboxes/${INBOX_TOKEN}/contacts/${sourceId}/conversations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = new Error("Failed to create conversation");
            (error as any).status = response.status;
            throw error;
        }

        return response.json();
    },

    /**
     * Envía un mensaje de texto a una conversación específica
     */
    async sendMessage(sourceId: string, conversationId: number, content: string, attachments?: File[]): Promise<any> {
        if (!BASE_URL || !INBOX_TOKEN) {
            throw new Error("Chatwoot configuration missing");
        }

        const url = `${BASE_URL}/public/api/v1/inboxes/${INBOX_TOKEN}/contacts/${sourceId}/conversations/${conversationId}/messages`;
        let options: RequestInit;

        if (attachments && attachments.length > 0) {
            const formData = new FormData();
            formData.append("content", content);
            attachments.forEach((file) => {
                formData.append("attachments[]", file);
            });

            options = {
                method: "POST",
                body: formData,
                // No Content-Type header for FormData, browser sets it with boundary
            };
        } else {
            options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content,
                }),
            };
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            const error = new Error("Failed to send message");
            (error as any).status = response.status;
            throw error;
        }

        return response.json();
    },
    /**
     * Obtiene los mensajes de una conversación
     */
    async getMessages(sourceId: string, conversationId: number): Promise<any[]> {
        if (!BASE_URL || !INBOX_TOKEN) {
            throw new Error("Chatwoot configuration missing");
        }

        const response = await fetch(`${BASE_URL}/public/api/v1/inboxes/${INBOX_TOKEN}/contacts/${sourceId}/conversations/${conversationId}/messages`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = new Error("Failed to fetch messages");
            (error as any).status = response.status;
            throw error;
        }

        return response.json();
    },
};
