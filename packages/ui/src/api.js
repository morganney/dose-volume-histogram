const api = {
  getDvhData: async setDvh => {
    const response = await fetch('http://localhost:3010/dvh')
    const maxDoses = []
    let json = null
    let data = null

    if (!response.ok && response.status !== 304) {
      throw new Error(`${response.status}: ${response.statusText}`)
    }

    json = await response.json()
    data = { structures: {} }
    data.plan = json.PlanId
    data.dose = json.PrescriptionDose
    json.Structures.forEach(struct => {
      maxDoses.push(Math.ceil(struct.MaxDose))
      data.structures[struct.StructureId] = {
        ...struct,
        Color: `#${struct.Color.substring(3)}`
      }
    })
    data.maxDoseAbsolute = Math.max(...maxDoses)
    data.maxDose = parseFloat(((data.maxDoseAbsolute / data.dose) * 100).toFixed(1))

    setDvh(data)
  }
}

export { api }
