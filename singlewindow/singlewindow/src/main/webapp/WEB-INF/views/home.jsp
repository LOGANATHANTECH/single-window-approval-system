<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Single Window Approval System</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/home.css">
    <script defer src="${pageContext.request.contextPath}/assets/js/home.js"></script>
</head>
<body>
    <header>
        <h1>Welcome to the Single Window Approval System</h1>
        <nav>
            <ul>
                <li><a href="home">Home</a></li>
                <li><a href="dashboard">Dashboard</a></li>
                <li><a href="login">Login</a></li>
                <li><a href="register">Register</a></li>
            </ul>
        </nav>
    </header>

    <section class="banner">
        <h2>Streamlining Approvals for Entrepreneurs</h2>
        <p>Your one-stop portal for hassle-free government approvals.</p>
        <button onclick="redirectToLogin()">Get Started</button>
    </section>

    <section class="features">
        <div class="feature-box">
            <h3>Centralized Platform</h3>
            <p>Submit all your applications in one place.</p>
        </div>
        <div class="feature-box">
            <h3>Real-Time Tracking</h3>
            <p>Monitor your application status instantly.</p>
        </div>
        <div class="feature-box">
            <h3>Faster Approvals</h3>
            <p>Integrated system ensures minimal delays.</p>
        </div>
    </section>

    <footer>
        <p>&copy; 2025 AdminAvengers. All rights reserved.</p>
    </footer>
</body>
</html>
