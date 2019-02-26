const keys = require('../../config/keys')

module.exports = survey => `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>We'd love you feed !</h3>
                    <p>Please answer the following question:</p>
                    <p>Body: ${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `
