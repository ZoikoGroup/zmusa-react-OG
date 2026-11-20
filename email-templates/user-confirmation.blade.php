{{--
  Zoiko Mobile — Confirmation sent to the visitor after a website form submission.
  Variables: $name, $email, $messageBody.
  ($message is reserved by Laravel mail views, so the body must be passed as $messageBody.)
--}}
@php
    $lines = preg_split('/\r\n|\r|\n/', trim($messageBody ?? ''));
    $hasHeader = count($lines) > 1 && preg_match('/[A-Z]/', $lines[0]) && strtoupper($lines[0]) === $lines[0];
    $formName = $hasHeader ? ucwords(strtolower(array_shift($lines))) : 'message';
    $rows = [];
    $freeText = [];
    foreach ($lines as $line) {
        if ($hasHeader && preg_match('/^([^:]{1,40}):\s*(.*)$/', $line, $m)) {
            // Internal bookkeeping fields aren't useful to the visitor.
            if (in_array(strtolower($m[1]), ['consent', 'agreed to spotlight terms', 'opted in to emails'])) continue;
            $rows[] = [$m[1], $m[2] === '' ? '-' : $m[2]];
        } elseif (trim($line) !== '') {
            $freeText[] = $line;
        }
    }
    $firstName = trim(explode(' ', trim($name ?? ''))[0]) ?: 'there';
    $what = $hasHeader ? 'your ' . $formName : 'your message';
@endphp
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>We've received {{ $what }}</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 20px !important; padding-right: 20px !important; }
      .hero-title { font-size:26px !important; line-height:32px !important; }
      .step td.num { width: 40px !important; }
    }
    a { color: #DF1E5A; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#F6F1F4; -webkit-text-size-adjust:100%;">
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
    Thanks, {{ $firstName }}! We've received {{ $what }} and our team will be in touch soon.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F6F1F4;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid #F0D5DF;">

          {{-- Logo --}}
          <tr>
            <td align="center" class="px" style="padding:26px 32px 20px;">
              <a href="https://zoikomobile.com" style="text-decoration:none;">
                <img src="https://zoikomobile.com/img/zoikomobileus-logo-png.png" width="150" alt="Zoiko Mobile" style="display:block; width:150px; height:auto; border:0;">
              </a>
            </td>
          </tr>

          {{-- Hero --}}
          <tr>
            <td align="center" class="px" bgcolor="#DF1E5A" style="background-color:#DF1E5A; background-image:linear-gradient(135deg,#DF1E5A 0%,#E60044 60%,#FF6A3D 100%); padding:40px 32px 38px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td align="center" width="56" height="56" style="width:56px; height:56px; background-color:#FFFFFF; border-radius:28px; font-family:Arial,Helvetica,sans-serif; font-size:28px; line-height:56px; font-weight:bold; color:#DF1E5A;">&#10003;</td>
                </tr>
              </table>
              <h1 class="hero-title" style="margin:20px 0 10px; font-family:Arial,Helvetica,sans-serif; font-size:30px; line-height:36px; font-weight:bold; color:#FFFFFF;">Thanks, {{ $firstName }}!</h1>
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:24px; color:#FFE8EF;">We've received {{ $what }}.<br>Our team will get back to you soon.</p>
            </td>
          </tr>

          {{-- What happens next --}}
          <tr>
            <td class="px" style="padding:32px 32px 8px;">
              <h2 style="margin:0 0 18px; font-family:Arial,Helvetica,sans-serif; font-size:18px; color:#22092C;">What happens next</h2>
              <table role="presentation" class="step" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="num" width="44" valign="top" style="padding-bottom:16px;">
                    <div style="width:30px; height:30px; border-radius:15px; background-color:#FDE7EE; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:30px; font-weight:bold; color:#DF1E5A; text-align:center;">1</div>
                  </td>
                  <td valign="top" style="padding-bottom:16px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#4A3A44;"><strong style="color:#22092C;">We review it.</strong> A member of our team reads every submission personally.</td>
                </tr>
                <tr>
                  <td class="num" width="44" valign="top" style="padding-bottom:16px;">
                    <div style="width:30px; height:30px; border-radius:15px; background-color:#FDE7EE; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:30px; font-weight:bold; color:#DF1E5A; text-align:center;">2</div>
                  </td>
                  <td valign="top" style="padding-bottom:16px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#4A3A44;"><strong style="color:#22092C;">We reply by email.</strong> We'll write to <a href="mailto:{{ $email }}" style="color:#DF1E5A; text-decoration:none;">{{ $email }}</a>, usually within 1–2 business days.</td>
                </tr>
                <tr>
                  <td class="num" width="44" valign="top">
                    <div style="width:30px; height:30px; border-radius:15px; background-color:#FDE7EE; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:30px; font-weight:bold; color:#DF1E5A; text-align:center;">3</div>
                  </td>
                  <td valign="top" style="font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#4A3A44;"><strong style="color:#22092C;">Need it sooner?</strong> Call us on <a href="tel:8009888116" style="color:#DF1E5A; text-decoration:none;">800-988-8116</a>.</td>
                </tr>
              </table>
            </td>
          </tr>

          {{-- Copy of submission --}}
          @if (count($rows) || count($freeText))
          <tr>
            <td class="px" style="padding:24px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FBF7F9; border:1px solid #F0D5DF; border-radius:12px; border-collapse:separate;">
                <tr>
                  <td style="padding:18px 20px 6px; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; letter-spacing:1px; text-transform:uppercase; color:#8A6B7A;">Your submission</td>
                </tr>
                @foreach ($rows as $row)
                <tr>
                  <td style="padding:6px 20px; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:21px; color:#22092C; word-break:break-word;">
                    <span style="color:#8A6B7A;">{{ $row[0] }}:</span> {{ $row[1] }}
                  </td>
                </tr>
                @endforeach
                @if (count($freeText))
                <tr>
                  <td style="padding:6px 20px; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:21px; color:#22092C; word-break:break-word;">
                    {!! nl2br(e(implode("\n", $freeText))) !!}
                  </td>
                </tr>
                @endif
                <tr><td style="height:12px; line-height:12px; font-size:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>
          @endif

          {{-- CTA --}}
          <tr>
            <td align="center" class="px" style="padding:28px 32px 36px;">
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#4A3A44;">While you wait, see what's new at Zoiko Mobile.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td bgcolor="#DF1E5A" style="border-radius:10px; background-color:#DF1E5A;">
                    <a href="https://zoikomobile.com/postpaid-plans/" style="display:inline-block; padding:14px 30px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:bold; color:#FFFFFF; text-decoration:none; border-radius:10px;">Explore our plans</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          {{-- Footer --}}
          <tr>
            <td align="center" class="px" style="padding:26px 32px 30px; background-color:#22092C;">
              <p style="margin:0 0 12px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:20px;">
                <a href="https://www.facebook.com/zoikomobile" style="color:#FFFFFF; text-decoration:none;">Facebook</a>
                <span style="color:#6E5368;">&nbsp;&middot;&nbsp;</span>
                <a href="https://instagram.com/zoikomobileus" style="color:#FFFFFF; text-decoration:none;">Instagram</a>
                <span style="color:#6E5368;">&nbsp;&middot;&nbsp;</span>
                <a href="https://x.com/zoikomobileusa" style="color:#FFFFFF; text-decoration:none;">X</a>
                <span style="color:#6E5368;">&nbsp;&middot;&nbsp;</span>
                <a href="https://www.linkedin.com/company/zoikomobileusa/" style="color:#FFFFFF; text-decoration:none;">LinkedIn</a>
                <span style="color:#6E5368;">&nbsp;&middot;&nbsp;</span>
                <a href="https://www.youtube.com/@ZoikoMobileUSA" style="color:#FFFFFF; text-decoration:none;">YouTube</a>
              </p>
              <p style="margin:0 0 6px; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; color:#C9B3C2;">
                Questions? <a href="mailto:info@zoikomobile.com" style="color:#FF8AAE; text-decoration:none;">info@zoikomobile.com</a> &middot; <a href="tel:8009888116" style="color:#FF8AAE; text-decoration:none;">800-988-8116</a>
              </p>
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; color:#9C8494;">
                You're receiving this because you submitted a form on <a href="https://zoikomobile.com" style="color:#C9B3C2;">zoikomobile.com</a>.<br>&copy; {{ date('Y') }} Zoiko Mobile. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
