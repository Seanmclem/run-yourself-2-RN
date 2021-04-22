export const msDifferenceToCounter = (duration: number) => {
    let seconds: string | number = Math.floor((duration / 1000) % 60);
    let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
    let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let milliseconds: string | number = parseInt(((duration % 1000) / 100).toString());

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return `${hours !== '00' ? `${hours}:` : ''}${minutes ? `${minutes}:` : ''}${seconds && `${seconds}`}`;
    // `${seconds}:`
    //    ${milliseconds.toString()}

}