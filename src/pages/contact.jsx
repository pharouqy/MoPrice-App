const Contact = () => {
    return (
      <div className="contact">
        <h1>Contact</h1>
        <form action="" method="post">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default Contact;