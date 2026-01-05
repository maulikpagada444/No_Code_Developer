# Chatbot & Conversation Management API Documentation

## Overview
This document outlines the required backend API endpoints for the chatbot conversation management system.

## Database Schema Requirements

### 1. Conversations Table
```sql
CREATE TABLE conversations (
    conversation_id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_uuid VARCHAR(36) UNIQUE NOT NULL,
    uid INT NOT NULL,                    -- User ID
    session_id VARCHAR(255) NOT NULL,    -- Project session ID
    title VARCHAR(255),                  -- Auto-generated from first message
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES users(uid),
    INDEX idx_session_id (session_id),
    INDEX idx_uid (uid)
);
```

### 2. Messages Table (replaces chat_history)
```sql
CREATE TABLE messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_uuid VARCHAR(36) NOT NULL,
    role ENUM('user', 'assistant') NOT NULL,
    content TEXT NOT NULL,
    message_type ENUM('text', 'suggestion', 'code_change') DEFAULT 'text',
    metadata JSON,                       -- For actions_taken, suggestions, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_uuid) REFERENCES conversations(conversation_uuid),
    INDEX idx_conversation (conversation_uuid),
    INDEX idx_created_at (created_at)
);
```

## API Endpoints

### 1. Get All Conversations
**Endpoint:** `GET /api/web-generator/conversations/{session_id}`

**Description:** Fetch all conversations for a specific session

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "status": true,
    "conversations": [
        {
            "id": "conv-uuid-123",
            "title": "Make the header dark with gradient...",
            "lastMessage": "I've updated the header with a dark gradient background.",
            "messageCount": 8,
            "updatedAt": "2026-01-05T10:30:00Z"
        },
        {
            "id": "conv-uuid-456",
            "title": "Add a contact form to the footer",
            "lastMessage": "Contact form has been added successfully.",
            "messageCount": 5,
            "updatedAt": "2026-01-04T15:20:00Z"
        }
    ]
}
```

**Implementation Notes:**
- Sort conversations by `updated_at` DESC (most recent first)
- `title` should be auto-generated from the first user message (max 40 chars + "...")
- `lastMessage` is the last message content (user or AI)
- `messageCount` is total messages in the conversation

---

### 2. Create New Conversation
**Endpoint:** `POST /api/web-generator/conversation/new`

**Description:** Create a new conversation for a session

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
    "session_id": "session-123"
}
```

**Response:**
```json
{
    "status": true,
    "conversation_id": "conv-uuid-789",
    "created_at": "2026-01-05T11:00:00Z"
}
```

**Implementation Notes:**
- Generate a unique UUID for `conversation_uuid`
- Extract `uid` from the JWT token
- Initially, `title` can be null or "New Chat" (will be updated with first message)

---

### 3. Get Conversation Messages
**Endpoint:** `GET /api/web-generator/conversation/{conversation_id}`

**Description:** Fetch all messages from a specific conversation

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "status": true,
    "messages": [
        {
            "role": "user",
            "content": "Make the header dark",
            "message_type": "text",
            "metadata": null,
            "created_at": "2026-01-05T10:00:00Z"
        },
        {
            "role": "assistant",
            "content": "I've updated the header with a dark background.",
            "message_type": "code_change",
            "metadata": {
                "actions_taken": [
                    {
                        "type": "edit",
                        "component": "header",
                        "message": "Updated background color to dark"
                    }
                ],
                "suggestions": ["Add a gradient effect", "Make it sticky on scroll"],
                "intent": "edit"
            },
            "created_at": "2026-01-05T10:00:15Z"
        }
    ]
}
```

**Implementation Notes:**
- Return messages sorted by `created_at` ASC (chronological order)
- Include all metadata as JSON

---

### 4. Send Chat Message (UPDATED)
**Endpoint:** `POST /api/web-generator/chat-message`

**Description:** Send a message and get AI response

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body:**
```json
{
    "session_id": "session-123",
    "conversation_id": "conv-uuid-789",
    "message": "Make the hero section buttons larger",
    "selected_element": "hero-cta-button"  // OPTIONAL
}
```

**Response:**
```json
{
    "status": true,
    "response": "I've made the hero section buttons larger with improved padding.",
    "actions_taken": [
        {
            "type": "edit",
            "component": "hero-cta-button",
            "message": "Increased button size and padding"
        }
    ],
    "blueprint_updated": true,
    "suggestions": [
        "Add hover animation to buttons",
        "Make buttons rounded"
    ],
    "intent": "edit",
    "generated_code": "<updated HTML code here>"  // If applicable
}
```

**Implementation Steps:**
1. **Save User Message:**
   - Insert user message into `messages` table with `role='user'`
   - Update conversation's `updated_at` timestamp
   - If this is the first user message, update conversation `title`

2. **Process with AI:**
   - Send message to ChatbotService
   - Get AI response and any blueprint changes

3. **Save AI Response:**
   - Insert AI message into `messages` table with `role='assistant'`
   - Store `actions_taken`, `suggestions`, etc. in `metadata` JSON field
   - Set appropriate `message_type` ('text', 'code_change', etc.)

4. **Return Response:**
   - Include all relevant data for frontend to update UI

**Implementation Notes:**
- If `conversation_id` is not provided, return error (frontend will create one first)
- Update conversation's `updated_at` timestamp after each message
- Store structured metadata as JSON for rich message display

---

### 5. Delete Conversation
**Endpoint:** `DELETE /api/web-generator/conversation/{conversation_id}`

**Description:** Delete a conversation and all its messages

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "status": true,
    "message": "Conversation deleted successfully"
}
```

**Implementation Notes:**
- Delete all messages in the conversation first (foreign key constraint)
- Then delete the conversation record
- Verify that the conversation belongs to the authenticated user

---

### 6. Get AI Suggestions (OPTIONAL)
**Endpoint:** `GET /api/web-generator/chat-suggestions/{session_id}`

**Description:** Get AI-powered suggestions for the current website

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
    "status": true,
    "suggestions": [
        {
            "title": "Improve Hero Section",
            "description": "Make the hero section more engaging with animations",
            "component": "hero",
            "priority": "high"
        },
        {
            "title": "Add Testimonials",
            "description": "Include customer testimonials for social proof",
            "component": "footer",
            "priority": "medium"
        }
    ]
}
```

**Implementation Notes:**
- Analyze the current blueprint/website
- Generate contextual suggestions using AI
- This can be shown proactively in the UI

---

## Frontend Integration Points

### ChatPanel Component
The frontend `ChatPanel.jsx` uses these APIs in the following flow:

1. **On Panel Open:**
   - Call `GET /conversations/{session_id}` to load conversation list
   - If conversations exist, load the most recent one
   - If no conversations exist, call `POST /conversation/new`

2. **New Chat Button (+):**
   - Call `POST /conversation/new`
   - Clear chat history
   - Set new conversation as active

3. **History Button (Clock):**
   - Show sidebar with conversation list
   - Each item shows title, last message, time, message count

4. **Select Conversation:**
   - Call `GET /conversation/{id}` to load messages
   - Display messages in chat UI

5. **Send Message:**
   - Call `POST /chat-message` with conversation_id
   - Add user message to UI immediately
   - Show loading state
   - Add AI response when received
   - Reload conversation list to update title/timestamp

6. **Delete Conversation:**
   - Call `DELETE /conversation/{id}`
   - If current conversation, create a new one
   - Reload conversation list

---

## Error Handling

All endpoints should return appropriate HTTP status codes:
- `200 OK` - Success
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Invalid/missing token
- `404 Not Found` - Conversation not found
- `500 Internal Server Error` - Server error

Error response format:
```json
{
    "status": false,
    "message": "Error description here"
}
```

---

## Migration Notes

If you already have a `chat_history` table:
1. Create the new `conversations` and `messages` tables
2. Migrate existing chat history:
   - Group messages by session_id and create conversations
   - Move message data to the new `messages` table
3. Optionally keep `chat_history` for backup

---

## Testing Checklist

- [ ] Create new conversation
- [ ] Send message in conversation
- [ ] Load conversation messages
- [ ] List all conversations for a session
- [ ] Delete conversation
- [ ] Auto-generate title from first message
- [ ] Update conversation timestamp on new message
- [ ] Store and retrieve metadata correctly
- [ ] Handle multiple conversations per session
- [ ] Verify user authorization for all operations
