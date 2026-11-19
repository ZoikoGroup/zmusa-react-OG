{{--
  Zoiko Mobile — Admin notification for website form submissions.
  Variables: $name, $email, $phone, $messageBody, optional $submittedAt.
  ($message is reserved by Laravel mail views, so the body must be passed as $messageBody.)
--}}
@php
    $lines = preg_split('/\r\n|\r|\n/', trim($messageBody ?? ''));
    $hasHeader = count($lines) > 1 && preg_match('/[A-Z]/', $lines[0]) && strtoupper($lines[0]) === $lines[0];
    $formName = $hasHeader ? ucwords(strtolower(array_shift($lines))) : 'Contact Us Message';
    $rows = [];
    $freeText = [];
    foreach ($lines as $line) {
        if ($hasHeader && preg_match('/^([^:]{1,40}):\s*(.*)$/', $line, $m)) {
            $rows[] = [$m[1], $m[2] === '' ? '-' : $m[2]];
        } elseif (trim($line) !== '') {
            $freeText[] = $line;
        }
    }
    $phoneDisplay = trim($phone ?? '') !== '' ? $phone : 'Not provided';
    $when = $submittedAt ?? now()->format('M j, Y \a\t g:i A T');
@endphp
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New {{ $formName }}</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 20px !important; padding-right: 20px !important; }
      .stack td.label { display: block !important; width: 100% !important; padding-bottom: 2px !important; border-bottom: 0 !important; }
      .stack td.value { display: block !important; width: 100% !important; padding-top: 0 !important; }
    }
    a { color: #DF1E5A; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#F6F1F4; -webkit-text-size-adjust:100%;">
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
    New {{ $formName }} from {{ $name }} ({{ $email }})
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F6F1F4;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid #F0D5DF;">

          {{-- Logo --}}
          <tr>
            <td class="px" style="padding:24px 32px 18px; border-bottom:1px solid #F0D5DF;">
              <img src="https://zoikomobile.com/img/zoikomobileus-logo-png.png" width="130" alt="Zoiko Mobile" style="display:block; width:130px; height:auto; border:0;">
            </td>
          </tr>

          {{-- Title band --}}
          <tr>
            <td class="px" bgcolor="#DF1E5A" style="background-color:#DF1E5A; background-image:linear-gradient(135deg,#DF1E5A 0%,#E60044 100%); padding:26px 32px;">
              <p style="margin:0 0 6px; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; color:#FFD6E2;">New website submission</p>
              <h1 style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:24px; line-height:30px; font-weight:bold; color:#FFFFFF;">{{ $formName }}</h1>
              <p style="margin:8px 0 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#FFE8EF;">Received {{ $when }}</p>
            </td>
          </tr>

          {{-- Sender --}}
          <tr>
            <td class="px" style="padding:28px 32px 8px;">
              <h2 style="margin:0 0 14px; font-family:Arial,Helvetica,sans-serif; font-size:13px; letter-spacing:1px; text-transform:uppercase; color:#8A6B7A;">From</h2>
              <table role="presentation" class="stack" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #F0D5DF; border-radius:12px; border-collapse:separate;">
                <tr>
                  <td class="label" width="32%" style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#8A6B7A; border-bottom:1px solid #F7E6EC;">Name</td>
                  <td class="value" style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:bold; color:#22092C; border-bottom:1px solid #F7E6EC;">{{ $name }}</td>
                </tr>
                <tr>
                  <td class="label" width="32%" style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#8A6B7A; border-bottom:1px solid #F7E6EC;">Email</td>
                  <td class="value" style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:15px; color:#22092C; border-bottom:1px solid #F7E6EC;"><a href="mailto:{{ $email }}" style="color:#DF1E5A; text-decoration:none;">{{ $email }}</a></td>
                </tr>
                <tr>
                  <td class="label" width="32%" style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#8A6B7A;">Phone</td>
                  <td class="value" style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:15px; color:#22092C;">{{ $phoneDisplay }}</td>
                </tr>
              </table>
            </td>
          </tr>

          {{-- Details --}}
          <tr>
            <td class="px" style="padding:20px 32px 8px;">
              <h2 style="margin:0 0 14px; font-family:Arial,Helvetica,sans-serif; font-size:13px; letter-spacing:1px; text-transform:uppercase; color:#8A6B7A;">{{ count($rows) ? 'Details' : 'Message' }}</h2>

              @if (count($rows))
              <table role="presentation" class="stack" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #F0D5DF; border-radius:12px; border-collapse:separate;">
                @foreach ($rows as $i => $row)
                <tr>
                  <td class="label" width="32%" valign="top" style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#8A6B7A; {{ $i < count($rows) - 1 ? 'border-bottom:1px solid #F7E6EC;' : '' }}">{{ $row[0] }}</td>
                  <td class="value" valign="top" style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:22px; color:#22092C; word-break:break-word; {{ $i < count($rows) - 1 ? 'border-bottom:1px solid #F7E6EC;' : '' }}">{{ $row[1] }}</td>
                </tr>
                @endforeach
              </table>
              @endif

              @if (count($freeText))
              <div style="margin-top:{{ count($rows) ? '14px' : '0' }}; padding:16px 18px; background-color:#FFF5F8; border-left:4px solid #DF1E5A; border-radius:8px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:23px; color:#22092C; word-break:break-word;">
                {!! nl2br(e(implode("\n", $freeText))) !!}
              </div>
              @endif
            </td>
          </tr>

          {{-- Action --}}
          <tr>
            <td class="px" style="padding:24px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#DF1E5A" style="border-radius:10px; background-color:#DF1E5A;">
                    <a href="mailto:{{ $email }}?subject={{ rawurlencode('Re: ' . $formName) }}" style="display:inline-block; padding:13px 26px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:bold; color:#FFFFFF; text-decoration:none; border-radius:10px;">Reply to {{ $name }}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          {{-- Footer --}}
          <tr>
            <td class="px" style="padding:18px 32px; background-color:#FBF7F9; border-top:1px solid #F0D5DF; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; color:#8A6B7A;">
              Sent automatically by the Zoiko Mobile website when a visitor submitted a form.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
