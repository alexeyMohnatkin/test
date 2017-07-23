const DEFAULT_ERROR = 'Error';

export default function handleError(error) {

	if (!error.response) {
		return DEFAULT_ERROR;
	}

	switch (error.response.status) {
		case 400: {
			return error.response.data.error.message || 'Something went wrong';
		}
		case 404: {
			return '404, not found';
		}
		case 500:
		case 502: {
			return 'Internal server error, try later';
		}
		default: {
			return DEFAULT_ERROR;
		}
	}

}
