<template>
  <div class="floatSection">
    <div v-show="showChatButton" class="chatbtn" @click="toggleChatContainer">
      <p class="mb-0 d-flex align-items-center cursor-pointer">
        <i class="fa-regular fa-message fs-6 float-end me-2"></i>Quick Ask
        Anything
      </p>
    </div>
    <div class="chat-container" v-show="showChatContainer">
      <div
        class="d-flex justify-content-between align-items-center chathead px-2 py-2"
      >
        <div class="d-flex align-items-center">
          <img src="../assets/image/chat2.png" class="headicon me-1" />
          <p class="mb-0 fs-14">ProjectBook Quick Ask</p>
        </div>
        <i
          @click="toggleChatContainer"
          class="fa-solid fa-xmark fs-18 text-white cursor-pointer"
        ></i>
      </div>
      <div class="chat-item p-2">
        <div class="chat-messages-container" data-simplebar ref="chatContainer">
          <div class="chat-messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="message"
              :class="
                message.from === 'user'
                  ? 'user-message py-1'
                  : 'bot-message py-1'
              "
            >
              {{ message.text }}
              <gj
                div
                class="my-2 row align-items-center"
                v-if="message.options"
              >
                <span
                  class="col border px-2 py-1 mx-1 cursor-pointer"
                  v-for="option in message.options"
                  @click="handleOptionSelection(option)"
                  >{{ option }}</span
                >
              </gj>
              <div class="row g-2 align-items-center" v-if="message.answers">
                <div v-if="message.ansType === 'project'">
                  <router-link
                    class="col-12"
                    v-for="answer in message.answers"
                    :to="`/projectlistview/${answer.p_id}`"
                  >
                    <div class="d-flex justify-content-between">
                      <div>
                        {{ answer.project_name }}
                      </div>
                      <div>
                        {{ answer.sdate }}
                      </div>
                    </div>
                  </router-link>
                </div>

                <div v-if="message.ansType === 'draft project'">
                  <router-link
                    class="col-12"
                    v-for="answer in message.answers"
                    :to="{
                      path: '/projectadd',
                      query: { editid: answer.p_id },
                    }"
                  >
                    <div class="d-flex justify-content-between">
                      <div>
                        {{ answer.project_name }}
                      </div>
                      <div>
                        {{ answer.create_date }}
                      </div>
                    </div>
                  </router-link>
                </div>

                <div v-if="message.ansType === 'invoice'">
                  <router-link
                    class="col-12"
                    v-for="answer in message.answers"
                    :to="`/invoiceoverview/${answer.in_id}`"
                  >
                    <div class="d-flex justify-content-between">
                      <div>
                        {{ answer.in_id }}
                      </div>
                      <div>
                        {{ answer.create_date }}
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>

            <div v-show="showTyping" class="message bot-message py-1">
              Typing...
            </div>
          </div>
        </div>
        <div class="chat-input d-flex align-items-center">
          <input
            type="text"
            v-model="userInput"
            @keydown.enter="sendMessage"
            placeholder="Type your message..."
          />
          <i
            @click="sendMessage"
            class="fa-solid fa-paper-plane fs-18 mx-2 cursor-pointer"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBot",
  data() {
    return {
      userInput: "",
      messages: [
        {
          from: "bot",
          text: "Hi! Rion How can I assist you today?",
          options: "",
          answers: [],
          ansType: "",
        },
      ],
      showChatContainer: false,
      showChatButton: true,
      awaitingDuration: false,
      tag: "",
      showTyping: false,
    };
  },
  methods: {
    sendMessage() {
      const userMessage = this.userInput.trim();
      if (userMessage === "") return;

      this.messages.push({ from: "user", text: userMessage });
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      this.userInput = "";

      if (this.awaitingDuration) {
        this.handleDurationRequest(userMessage, this.tag);
      } else {
        this.handleUserRequest(userMessage);
      }
    },
    handleUserRequest(userMessage) {
      // Handle specific user requests
      if (userMessage.toLowerCase().includes("draft project")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the draft projects?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "draft project";
      } else if (userMessage.toLowerCase().includes("ongoing project")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the ongoing projects?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "ongoing project";
      } else if (userMessage.toLowerCase().includes("hi")) {
        this.showTyping = !this.showTyping;
        setTimeout(() => {
          this.showTyping = !this.showTyping;
          this.messages.push({
            from: "bot",
            text: "Hi fi no koris. ki bolbi bol...",
          });
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }, 3000);
      } else if (
        userMessage.toLowerCase().includes("completed project") ||
        userMessage.toLowerCase().includes("complete project")
      ) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the completed projects?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "completed project";
      } else if (userMessage.toLowerCase().includes("due invoice")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the due invoices?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "due invoice";
      } else if (userMessage.toLowerCase().includes("pending bill")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the pending bills?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "pending bill";
      } else if (userMessage.toLowerCase().includes("paid bill")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the paid bills?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "paid bill";
      } else if (userMessage.toLowerCase().includes("due invoice")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the due invoices?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "due invoice";
      } else if (userMessage.toLowerCase().includes("paid invoice")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the paid invoices?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "paid invoice";
      } else if (userMessage.toLowerCase().includes("total income")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the total income?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "total income";
      } else if (userMessage.toLowerCase().includes("total expense")) {
        this.messages.push({
          from: "bot",
          text: "Sure, for which duration would you like to see the total expense?",
          options: ["Previous 3 Month", "This month", "This year"],
        });
        this.awaitingDuration = true;
        this.tag = "total expense";
      } else {
        this.showTyping = !this.showTyping;
        setTimeout(() => {
          this.showTyping = !this.showTyping;
          this.messages.push({
            from: "bot",
            text: "I am your Project Book. I can not recognize your text",
          });
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }, 1000);
      }
    },

    handleOptionSelection(option) {
      this.awaitingDuration = false;
      this.handleDurationRequest(option, this.tag);
    },

    handleDurationRequest(duration, tag) {
      this.showTyping = !this.showTyping;
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      const currentDate = new Date();
      currentDate.setDate(0);
      const firstDateOfMonth = currentDate.toISOString().split("T")[0];

      const currentYear = currentDate.getFullYear();
      const firstDateOfYear = new Date(currentYear, 0, 1)
        .toISOString()
        .split("T")[0];

      var threeMonthsAgo = new Date(currentDate);
      threeMonthsAgo.setMonth(currentDate.getMonth() - 2);
      const firstDateThreeMonthsAgo = new Date(
        threeMonthsAgo.getFullYear(),
        threeMonthsAgo.getMonth(),
        1
      )
        .toISOString()
        .split("T")[0];

      const dataData =
        duration === "This month"
          ? firstDateOfMonth
          : duration === "This year"
          ? firstDateOfYear
          : firstDateThreeMonthsAgo;
      console.log(dataData);
      switch (tag) {
        case "draft project":
        case "ongoing project":
        case "completed project":
          fetch("${process.env.VUE_APP_SERVER_URL}/getProjectData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sdate: dataData,
              status:
                tag === "completed project"
                  ? 1
                  : tag === "draft project"
                  ? "draft"
                  : 0,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              this.showTyping = !this.showTyping;

              const message = `You requested ${tag} data for ${duration}. Here are the results.`;
              this.messages.push({
                from: "bot",
                text: message,
                answers: data.message,
                ansType: tag === "draft project" ? "draft project" : "project",
              });
              this.$nextTick(() => {
                this.scrollToBottom();
              });

              this.awaitingDuration = false;
            });

          break;

        case "due invoice":
        case "paid invoice":
          fetch(`${process.env.VUE_APP_SERVER_URL}/getInvoiceData`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              create_date: dataData,
              status: tag === "paid invoices" ? 1 : 0,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              this.showTyping = !this.showTyping;
              console.log(data);
              const message = `You requested ${tag} data for ${duration}. Here are the results.`;
              this.messages.push({
                from: "bot",
                text: message,
                answers: data.message,
                ansType: "invoice",
              });
              this.$nextTick(() => {
                this.scrollToBottom();
              });

              this.awaitingDuration = false;
            });

          break;

        case "pending bill":
        case "paid bill":
          fetch(`${process.env.VUE_APP_SERVER_URL}/getInvoiceData`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              create_date: dataData,
              status: tag === "pending bill" ? 1 : 0,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              this.showTyping = !this.showTyping;

              const message = `You requested ${tag} data for ${duration}. Here are the results.`;
              this.messages.push({
                from: "bot",
                text: message,
                answers: data.message,
                ansType: tag,
              });
              this.$nextTick(() => {
                this.scrollToBottom();
              });

              this.awaitingDuration = false;
            });

          break;

        case "total income":
          break;

        case "total expense":
          break;

        default:
          break;
      }
    },
    scrollToBottom() {
      this.$refs.chatContainer.scrollTop =
        this.$refs.chatContainer.scrollHeight;
    },

    toggleChatContainer() {
      this.showChatContainer = !this.showChatContainer;
      this.showChatButton = !this.showChatButton;
      if (this.showChatContainer) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
  },
  mounted() {
    this.scrollToBottom();
  },

  watch: {
    messages: {
      handler(newMessages) {
        if (newMessages.length === 1) {
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.floatSection {
  position: fixed;
  bottom: 0;
  right: 40px;
  opacity: 100%;
}

.chatbtn {
  background-color: rgb(58, 58, 58);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 4px;
  padding: 7px 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
}

.chathead {
  background-color: #595c5c;
  color: white;
  font-weight: 600;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px solid #ccc;
}

.headicon {
  height: 20px;
  object-fit: contain;
}

.chat-container {
  width: 350px;
  margin: 0 auto;
  border-radius: 10px 10px 0px 0px;
  background-color: #e6eeee;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}

.chat-messages-container {
  height: 300px;
  overflow-y: auto;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
}

.user-message {
  align-self: flex-end;
  background-color: #2ca589;
  color: #ffffff;
  font-size: 14px;
}

.bot-message {
  align-self: flex-start;
  background-color: #ffffff;
  font-size: 14px;
}

.chat-input {
  margin-top: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px !important;
}

input:focus {
  border: 1px solid #ccc;
  outline: 0 !important;
  box-shadow: none !important;
}
</style>
