# Email templates for website forms

These are Laravel Blade templates for the emails the backend (`zmapi.zoikomobile.co.uk`) sends when someone submits a form on the website. They are **not used by this Next.js app**; they live here so the frontend and backend teams share one design. Copy them into the backend to use them.

| File | Sent to | Suggested subject |
|---|---|---|
| `admin-notification.blade.php` | Admin inbox | `New {Form name} from {name}` |
| `user-confirmation.blade.php` | The visitor | `We've received your {form name}` |

## How the form name is detected

Every website form posts to `POST /api/contact-us` with `{ name, email, phone, message }`. Forms other than Contact Us put their name on the first line of `message` in capitals, then one field per line:

```
MUSIC SPOTLIGHT APPLICATION
Stage name: lk
City: hubli
Genre: Electronic / DJ
```

The templates turn that into a title ("Music Spotlight Application") and a details table. A plain Contact Us message has no header line, so it is shown as a normal paragraph with line breaks kept.

## Install (Laravel)

1. Copy both files to `resources/views/emails/`.
2. Pass the message as **`$messageBody`**, not `$message`. Laravel reserves `$message` inside mail views, and using it breaks the template.
3. Send both emails from the contact-us controller, for example:

```php
use Illuminate\Support\Facades\Mail;

$data = [
    'name'        => $request->name,
    'email'       => $request->email,
    'phone'       => $request->phone,
    'messageBody' => $request->message,
];

// Form name for the subject line (first line if it's an all-caps header)
$first = strtok($request->message, "\n");
$formName = (str_contains($request->message, "\n") && strtoupper($first) === $first)
    ? ucwords(strtolower($first)) : 'Contact Us Message';

Mail::send('emails.admin-notification', $data, function ($m) use ($data, $formName) {
    $m->to(config('mail.admin_address', 'info@zoikomobile.com'))
      ->replyTo($data['email'], $data['name'])   // "Reply" goes straight to the visitor
      ->subject("New {$formName} from {$data['name']}");
});

Mail::send('emails.user-confirmation', $data, function ($m) use ($data, $formName) {
    $m->to($data['email'], $data['name'])
      ->subject($formName === 'Contact Us Message'
          ? "We've received your message"
          : "We've received your " . strtolower($formName));
});
```

Send the two emails separately (not one email to admin + visitor), so the visitor never sees the admin version or the admin address.

## Before going live, check

- **Logo URL:** `https://zoikomobile.com/img/zoikomobileus-logo-png.png` must load publicly. Change it in both files if the site is on another domain.
- **Response time:** the confirmation promises a reply "usually within 1–2 business days". Change that line if it isn't accurate.
- **Phone and email** in the footer: `800-988-8116`, `info@zoikomobile.com` (taken from the website footer).
- **Mail settings:** if `/api/contact-us` returns a 500 error, check the mail settings in `.env` first; a failed send is a common cause.
