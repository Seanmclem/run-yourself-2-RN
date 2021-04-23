export const msDifferenceToCounter = (duration: number, hideMilliseconds?: boolean) => {
    let seconds: string | number = Math.floor((duration / 1000) % 60);
    let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
    let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let milliseconds: string | number = parseInt(((duration % 1000) / 10).toString());

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    const hh = hours !== '00' ? `${hours}:` : '';
    const mm = minutes ? `${minutes}:` : ''
    const ss = `${seconds ? `${seconds}` : ''}`;
    const ms = `${!hideMilliseconds ? `:${milliseconds}` : ''}`

    return `${hh}${mm}${ss}${ms}`;

}