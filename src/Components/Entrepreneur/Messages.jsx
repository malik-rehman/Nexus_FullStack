import { useMemo, useState } from "react";

const initialConversations = [
  {
    id: 1,
    name: "Michael Rodriguez",
    preview: "Thursday works gre...",
    online: true,
    unread: "New",
    messages: [
      {
        id: 1,
        sender: "me",
        text: "Thanks for connecting. Id love to discuss how our AI platform can revolutionize financial analytics for SMBs.",
        time: "over 2 years ago",
      },
      {
        id: 2,
        sender: "them",
        text: "Im interested in learning more about your tech stack and ML models. Are you available for a call this week?",
        time: "over 2 years ago",
      },
      {
        id: 3,
        sender: "me",
        text: "Absolutely! I can walk you through our technology and current traction. How does Thursday at 2pm PT work?",
        time: "over 2 years ago",
      },
      {
        id: 4,
        sender: "them",
        text: "Thursday works great. Ill send a calendar invite. Looking forward to it!",
        time: "over 2 years ago",
      },
    ],
  },
  {
    id: 2,
    name: "Ava Johnson",
    preview: "Can we review your proposal?",
    online: false,
    unread: "",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Can we review your proposal tomorrow morning?",
        time: "1 day ago",
      },
      {
        id: 2,
        sender: "me",
        text: "Yes, 10am works perfectly for me.",
        time: "1 day ago",
      },
    ],
  },
];

function Avatar({ name }) {
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase(),
    [name],
  );

  return (
    <div className="h-10 w-10 rounded-full bg-slate-300 text-slate-700 grid place-items-center text-sm font-semibold">
      {initials}
    </div>
  );
}

function Messages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialConversations[0].id);
  const [draft, setDraft] = useState("");

  const activeConversation = conversations.find((conv) => conv.id === activeId);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,
              preview: text.slice(0, 28) + (text.length > 28 ? "..." : ""),
              messages: [
                ...conversation.messages,
                {
                  id: Date.now(),
                  sender: "me",
                  text,
                  time: "just now",
                },
              ],
            }
          : conversation,
      ),
    );

    setDraft("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (!activeConversation) return null;

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-6">
      <div className="mx-auto h-[88vh] max-w-7xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid h-full grid-cols-1 md:grid-cols-[280px_1fr]">
          <aside className="border-b border-slate-200 md:border-b-0 md:border-r">
            <div className="border-b border-slate-200 px-4 py-3">
              <h2 className="text-lg font-semibold text-slate-800">Messages</h2>
            </div>

            <div className="max-h-[calc(88vh-60px)] overflow-y-auto">
              {conversations.map((conversation) => {
                const active = conversation.id === activeId;
                return (
                  <button
                    key={conversation.id}
                    onClick={() => setActiveId(conversation.id)}
                    className={`w-full border-l-4 px-4 py-3 text-left transition ${
                      active
                        ? "border-blue-500 bg-blue-50"
                        : "border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <Avatar name={conversation.name} />
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate font-medium text-slate-800">
                            {conversation.name}
                          </p>
                          {conversation.unread && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                        <p className="truncate text-sm text-slate-500">
                          {conversation.preview}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="flex h-full min-h-0 flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar name={activeConversation.name} />
                  {activeConversation.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {activeConversation.name}
                  </h3>
                  <p className="text-xs text-emerald-600">
                    {activeConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <button className="rounded-lg p-2 hover:bg-slate-100" aria-label="Call">
                  📞
                </button>
                <button
                  className="rounded-lg p-2 hover:bg-slate-100"
                  aria-label="Video call"
                >
                  🎥
                </button>
                <button className="rounded-lg p-2 hover:bg-slate-100" aria-label="Info">
                  ℹ️
                </button>
              </div>
            </header>

            <main className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-6 sm:px-8">
              {activeConversation.messages.map((message) => {
                const isMe = message.sender === "me";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[80%] sm:max-w-[70%]">
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          isMe
                            ? "rounded-br-md bg-blue-600 text-white"
                            : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {message.text}
                      </div>
                      <p
                        className={`mt-1 text-xs text-slate-400 ${
                          isMe ? "text-right" : "text-left"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </main>

            <footer className="border-t border-slate-200 bg-white p-3 sm:p-4">
              <div className="flex items-end gap-2">
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Type a message..."
                  className="max-h-28 min-h-11 flex-1 resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-600 text-lg text-white transition hover:bg-blue-700"
                  aria-label="Send message"
                >
                  ➤
                </button>
              </div>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Messages;
