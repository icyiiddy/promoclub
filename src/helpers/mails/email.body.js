export const emailBody = token => `
  <body style="margin: 0; padding: 0;">
    <div style="width: 100%;">
      <header style="background-color: #126eb0; color: #fff; text-align: center; font-size: 3em;">Promo Club</header>
      <section>${token}</section>
    </div>
  </body>
`;
