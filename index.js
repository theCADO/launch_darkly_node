import LaunchDarkly from 'launchdarkly-node-server-sdk';
const ld_skd_key = ""

import express from 'express';
const app = express();
const port = 3456;

const ldClient = LaunchDarkly.init(ld_skd_key);

const user = {
    firstName: 'Bob',
    lastName: 'Loblaw',
    key: 'example-user-key',
};
const admin_user = {
    firstName: 'Carl',
    lastName: 'Dolling',
    key: 'super-secret-admin-key',
};

app.get('/', (req, res) => {
    let current_user = req.query.user == "admin" ? admin_user : user;
    let html = "";
    html += '<!DOCTYPEhtml><htmllang="en"><head><metacharset="UTF-8"><metahttp-equiv="X-UA-Compatible"content="IE=edge"><metaname="viewport"content="width=device-width,initial-scale=1.0"><title>LaunchDarklyTest</title><style>body{font-family:arial,sans-serif;}table{border-collapse:collapse;width:100%;}td,th{border:1pxsolid#dddddd;text-align:left;padding:8px;}tr:nth-child(even){background-color:#dddddd;}</style></head><body>';

    ldClient.variation('beta-header', current_user, false, function (err, showFeature) {
        if (showFeature) {
            html += `<div class="info-banner">
            <h2>Attention, this is website contains beta features</h2>
            </div>`;
        }
        html += `<div class="content"><table>`;


        ldClient.variation('admin-options', current_user, false, function (err, showFeature) {
            html += `<tr>
            <th>User ID</th>
            <th>Balance</th>`;
            if (showFeature) {
                html += `<th>Remove User</th>`;
            }
            html += `</tr>`;
            for (let index = 0; index < 10; ++index) {
                html += `<tr>
                <td>`+ (Math.floor(Math.random() * 100) + 1) + `</td>
                <td>$`+ (Math.floor(Math.random() * 1000) + 100) + `</td>`;
                if (showFeature) {
                    html += `<td><button type="button">Remove User</button></td>`;
                }
                html += `</tr>`;
            }
            html += `</table></div>`;
            html += '</body></html>';
            res.send(html);
        });
    });


});

app.listen(port, () => console.log(`App listening to port ${port}`));

process.on('exit', () => {
    ldClient.flush(function () {
        ldClient.close();
    });
})