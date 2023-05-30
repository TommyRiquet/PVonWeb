var pdf = require('pdf-creator-node')
var fs = require('fs')


export const generatePdf = async (organization, transcript) => {
	var html = fs.readFileSync('./services/template/template.html', 'utf8')

	var options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm',
		header: {
			height: '45mm',
			contents: `<div style="text-align: center;display: flex;flex-direction: column; border-bottom: 1px solid gray">
			<div>${organization.registre_nationnal} SRL</div>
			<div>${organization.num_tva}</div>
			<div>${organization.address}</div>
			<div>${organization.locality}</div>
			<br/>
			</div>
			`
		},
		footer: {
			contents: {
				default: '<br/><div style="text-align: center;">{{page}}</div>'
			}
		},
		childProcessOptions: {
				env: {
						OPENSSL_CONF: '/dev/null'
				}
		}
	}

	var document = {
		html: html,
		data: {
			organization: organization,
			transcript: transcript
		},
		path: `./media/${transcript.id}.pdf`,
		type: ''
	}

	return pdf.create(document, options)
		.then((res) => {
			return res
		}
		)
		.catch((error) => {
			return error
		}
		)
}
