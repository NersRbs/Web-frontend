document.addEventListener("DOMContentLoaded", () => {
    const feedbackContainer = document.getElementById("feedbacks-container");
    const preloader = document.getElementById("preloader");

    const fetchData = async () => {
        try {
            preloader.style.display = "block";

            const [commentsResponse, usersResponse] = await Promise.all([
                fetch("https://jsonplaceholder.typicode.com/comments?_limit=10"),
                fetch("https://jsonplaceholder.typicode.com/users?_limit=10")
            ]);

            if (!commentsResponse.ok || !usersResponse.ok) {
                throw new Error("Ошибка сети");
            }

            const [comments, users] = await Promise.all([
                commentsResponse.json(),
                usersResponse.json()
            ]);

            const data = comments.map((comment, index) => {
                const user = users[index] || {};
                return {
                    username: user.username ?? "unknown",
                    evaluation: Math.floor(Math.random() * (10 - 8 + 1)) + 8,
                    body: comment.body ?? ""
                };
            });

            renderFeedbacks(data);
        } catch (error) {
            showError();
        } finally {
            preloader.style.display = "none";
        }
    };

    const renderFeedbacks = (data) => {
        feedbackContainer.innerHTML = data
            .map(item => `
                <div class="feedback-item">
                    <div class="feedback-header">
                        <img src="https://i.pravatar.cc/50?u=${item.username}" alt="Avatar">
                        <span>${item.username}</span>
                    </div>
                    <span class="feedback-evaluation">Оценка: ${item.evaluation}/10</span>
                    <p>${item.body}</p>
                </div>
            `).join("");
    };

    const showError = () => {
        feedbackContainer.innerHTML = `<p class="border-black">⚠ Что-то пошло не так.</p>`;
    };

    fetchData();
});
