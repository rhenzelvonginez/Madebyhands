<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seller Status Updated</title>
  <style>
    /* General styles */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .login-btn {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Container for email */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    /* Responsive header */
    h1 {
      font-size: 24px;
      color: #333333;
      text-align: center;
    }

    /* Text content */
    p {
      color: #555555;
      font-size: 16px;
      line-height: 1.6;
    }



    /* Button */
    .button {
      display: inline-block;
      padding: 12px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
    }

    /* Footer */
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #888888;
    }

    /* Media queries for responsiveness */
    @media screen and (max-width: 600px) {
      .email-container {
        padding: 10px;
      }

      h1 {
        font-size: 20px;
      }

      p {
        font-size: 14px;
      }
    }
  </style>
</head>

<body>
  <div class="email-container">
    <h1>Your Status Has Been Updated</h1>

    <p>Hello Seller,</p>
    <p>Your current status is: <strong class="status">{{ $sellerData->is_verified == 1 ? 'Verified' : 'Not Verified' }}</strong>.</p>
    <p>Please log in to your account to complete the data update process. Once your information is up to date, you will be able to start uploading your products.</p>
    <div class="login-btn"><a href="{{ url('/login') }}" class="button">Log in to Your Account</a></div>


    <div class="footer">
      <p>&copy; 2024 MadeByHands. All rights reserved.</p>
    </div>
  </div>
</body>

</html>