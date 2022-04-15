<br/>
<h1 align="center"><img src="https://user-images.githubusercontent.com/609038/163602561-26f581f0-74d2-44d8-8d6a-29eef85f349a.png#gh-dark-mode-only" alt="Mailling logo" width="294" height="64"/>
<img src="https://user-images.githubusercontent.com/609038/163602563-35840c7b-997b-4255-9810-c03b097bac14.png#gh-light-mode-only" alt="Mailling logo" width="294" height="64"/></h1>


<p align="center"><b>Send great emails from your react app.</b></p>

<br/>

- Email templates with React components
- Battle-tested MJML components that work across clients (Outlook!)
- Mail previews for quick development
- Test-mode for ensuring emails send and have the correct content
- Inspired by ActionMailer
- Plays well with js frameworks like redwood.js, remix, next.js
- Written in Typescript

<br/>

# TODO: VIDEO HERE

<br/>

## ●  Why?

We love good emails. Usage metrics imply that a lot of people do. Bad emails suck.

But every web developer I've ever met hates making them.

We're trying to make coding them fun.

<br/>

## ● Setup

1. Install mailing in your package.json with yarn or npm.

`npm install mailing` or `yarn add mailing`

2. Install the mailing cli tool as a dev dependency

`npm install --save-dev mailing/cli` or `yarn add mailing cli --dev`

3. Scaffold your `email` directory with `mailing init`.

This will create the following directory structure:

```
emails
├── MyFirstEmail.tsx
├── components
│   ├── Body.tsx
│   └── Header.tsx
├── index.ts
└── previews
    └── MyFirstEmail.tsx
```

4. Configure your email transport in `email/index.ts`. It defaults to nodemailer's SMTP transport, but you can read about others [here](https://nodemailer.com/transports/).

```tsx
import nodemailer from "nodemailer";
import { Mailing } from "mailing";

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp.example.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "username",
    pass: "password",
  },
});

export default new Mailing({ transport });
```

5. Then send you first email like so:

```tsx
import { sendMail, MyFirstEmail } from "emails";

sendMail(<MyFirstEmail firstName="Bob" />);
```

<br/>

## ● Adding to a next.js app

TODO

<br/>

## Developing with email previews

Mailing includes a development mode for previewing your emails.

<br/>

## ● Testing emails with jest

```tsx
import { getTestMessageQueue } from "emails";

describe("Example API", () => {
  it("sends an email when an issue is ready for review", () => {
    // DO SOMETHING THAT SHOULD SEND AN EMAIL

    const emails = await getTestMessageQueue();
    expect(emails.length).toBe(1);
    expect(emails[0].subject).toMatch("Re: An issue title");
    expect(emails[0].html).toMatch("READY FOR REVIEW");
    expect(emails[0].html).toMatch("ready for QA");
  });
});
```

<br/>

## ● Contributing

Want to help make this? Cool!

### Setup

1. Ensure you have nodejs 12+ setup.

2. Run these to install the project

```zsh
git clone git@github.com:psugihara/mailing.git
cd mailing
npm install
npm build # compiles the project to /lib
npm link # symlinks the node module
mailing # this command is defined as bin in package.json
```

At this point you should also be able to link import.

- `src` has the source code
- `lib` is the build directory, no need to manually edit

### Plan

show hn requirements

- [x] setup package with lib and cli
- [x] generate emails directory
- [~] email.ts API
- [ ] basic tests for lib
- [~] basic tests for cli (init test)
- [~] email previews (working on this next)
- [ ] polished README
- [ ] logo
- [ ] rename (react-mailer, gigaben, mailing, omail, mailbus, must be available on npmjs.com)
- [ ] instructions for next.js integration
- [ ] publish to npm
- [ ] add video to readme
- [ ] split into 2 packages so that preview server is not included

---

just below the line

- [ ] instructions for redwood.js integration
- [ ] instructions for remix.run integration
- [ ] faktory integration
- [ ] mailing.run website

#### API

_`sendMail(mail: ComponentMail)`_

Send

```ts
type Mail
namespace mailing {
  export type ComponentMail = {
    from: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    component: ReactElement<any, string | JSXElementConstructor<any>>;
    text?: string;
    headers?: { [key: string]: string };
  };
  export type SendMailOptions = {
    transport: Transporter;
    defaulFrom?: string;
    forceDeliver?: boolean;
    forcePreview?: boolean;
  };
}
```

The CLI gets installed in `node_modules/.bin` as `mailing` and `mm` for short.

`mailing` initializes a project then starts the development server
`mailing init` initializes a project
`mailing preview` launches the development server
