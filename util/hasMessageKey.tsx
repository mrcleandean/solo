type ErrorWithMessage = {
    message: string
}

const hasMessageKey = (e: unknown): e is ErrorWithMessage => {
    if (e instanceof Object && e !== null && 'message' in e) {
        return true;
    }
    return false;
}

export default hasMessageKey