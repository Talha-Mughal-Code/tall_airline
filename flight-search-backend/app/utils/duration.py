def parse_iso8601_duration(duration: str) -> int:
    """
    Convert ISO8601 duration like 'PT2H30M' to total minutes
    """
    dur = duration.replace("PT", "")
    hours, minutes = 0, 0
    if "H" in dur:
        hours = int(dur.split("H")[0])
        dur = dur.split("H")[1] if "M" in dur else ""
    if "M" in dur:
        minutes = int(dur.replace("M",""))
    return hours*60 + minutes
