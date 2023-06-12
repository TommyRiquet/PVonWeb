var pdf = require('pdf-creator-node')
var fs = require('fs')
var utils = require('../utils/utils')


export const generatePdf = async (organization, transcript, warrants) => {
	var html = fs.readFileSync('./services/template/template.html', 'utf8')

	var options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm',
		header: {
			height: '45mm',
			contents: `<div style="text-align: center;display: flex;flex-direction: column; border-bottom: 1px solid gray">
			<div>${organization.name} SRL</div>
			<div>${organization.num_bce}</div>
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

	organization.total_profits = organization.profits + organization.reported_profits
	organization.total = organization.royalties + organization.dividends + organization.report_profits

	organization.administrators = organization.administrators.map((administrator) => {
		return {
			...administrator,
			total_parts: organization.nbr_parts
		}
	})

	organization.share_holders = organization.share_holders.map((share_holder) => {
		return {
			...share_holder,
			total_parts: organization.nbr_parts
		}
	})

	const link = transcript.link ? utils.getLink(transcript.link) : await utils.generateRandomLink()

	var document = {
		html: html,
		data: {
			organization: organization,
			transcript: transcript,
			warrants: warrants
		},
		path: `./media/${link}.pdf`,
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
